// On importe les variables d'environnement.
const dotenv = require("dotenv").config();
// On importe le package de cryptage pour hacher le mot de passe
const bcrypt = require('bcrypt');
// On importe le package Jsonwebtoken
const jwt = require('jsonwebtoken');
const mailValidator = require("email-validator");
const passwordValidator = require("password-validator");
// On importe le modèle Utilisateur
const User = require('../models/User');
// On inclut le module fs (filesystem) de Node js pour la gestion des fichiers
const fs = require('fs');

// Création d'un schéma
const schema = new passwordValidator();

// On ajoute les propriétés au schéma
schema
.is().min(8)                                    // Minimum 8 caractères
.is().max(20)                                   // Maximum 20 caractères
.has().uppercase()                              // Doit contenir des lettres majuscules
.has().lowercase()                              // Doit contenir des lettres minuscules
.has().digits(2);                                // Doit avoir au moins 2 chiffres


// Controleur pour la création d'un compte utilisateur
exports.signup = (req, res, next) => {
    // On vérifie que l'e-mail entré par l'utilisateur ne correspond pas à un utilisateur existant de la base de données
    User.findOne({ email: req.body.email })
        .then(user => {
            const email = req.body.email;
            const password = req.body.password;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            if (!email || !password || !firstname || !lastname){
                return res.status(400).send({
                    message: "E-mail, mot de passe, prénom ou nom manquant."
                })
            }
            if (!mailValidator.validate(email)) {
                return res.status(400).send({
                    message: "L'adresse mail n'est pas valide !"
                })
            } else if (user !== null) {
                return res.status(401).json({ message: 'L\'utilisateur est déjà dans la base de données !', email: user.email});
                
            } else if (!schema.validate(password)) {
                return res.status(400).send({
                    message: "Le mot de passe n'est pas valide ! Il doit contenir au moins 8 caractères, au  moins 2 chiffres, des majuscules et des minuscules." 
                })
            } else {
                // Première chose que l'on fait, on crypte le mot de passe, il s'agit d'une fonction
                // asynchrone, qui prend donc du temps ; ici on choisit d'effectuer 10 tours d'algorythme
                return bcrypt.hash(password, 10)
                    .then(hash => {
                        // on cré un nouveau user
                        const user = new User({
                            email: email,
                            password: hash,
                            firstname: firstname,
                            lastname: lastname
                        });
                        // et on le sauvegarde dans la base de données
                        user.save()
                            .then(() => res.status(201).json({ message: 'L\'utilisateur ' + (req.body.email) + ' a bien été créé !' }))
                            .catch(() => res.status(400).json({ message: 'L\'utilisateur ' + (req.body.email) + ' est déjà inscrit !', email: user.email }));
                    })
                    .catch(error => res.status(500).json({ error }))
            };
        })
        .catch(error => res.status(500).json({ error }));
};

// Contrôleur pour la connexion à un compte utilisateur
exports.login = (req, res, next) => {
    // On vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'L\'utilisateur n\'est pas dans la base de données !'});
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                // Fonction sign sert à chiffrer un nouveau token
                                token: jwt.sign(
                                    { userId: user._id },
                                    // Chaîne aléatoire pour crypter le token
                                    process.env.RANDOM_TOKEN_SECRET,
                                    // Durée de validité 24h ; Au delà, l'utilisateur doit se reconnecter
                                    { expiresIn: '24h' }
                                ),
                                
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));     
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Controleur pour la suppression d'un profil, uniquement par l'administrateur et le propriétaire du profil
exports.deleteProfil = (req, res, next) => {
    User.findById(req.auth.userId)
        .then((user) => {
            // si isAdmin de l'utilisateur est différent de false (c.a.d admin connecté) ou...
            //... si l'utilisateur authentifié est le propriétaire du profil
            if (user.isAdmin != false || req.auth.userId === req.params.id) {
                // on met dans une constante uniquement le nom de l'image et son extension
                const filenameStock = user.imageUrl.split('/images/')[1];
                // si l'image du profil est l'image de profil par défaut, on supprime le profil mais sans supprimer...
                //... l'image de profil par défaut du dossier "images" du backend
                if(filenameStock === "defaultImageProfile.png"){
                    User.deleteOne({_id: req.params.id})
                        .then(() => res.status(200).json({message: 'Profil supprimé !'}))
                        .catch(() => res.status(400).json({ message: 'Le profil que vous souhaitez supprimer est introuvable !' }));
                // sinon, on supprime le profil, y compris l'image du profil
                } else {
                    // On supprime le fichier image du post
                        fs.unlink(`images/${filenameStock}`, () => {
                            User.deleteOne({_id: req.params.id})
                                .then(() => res.status(200).json({message: 'Profil supprimé !'}))
                                .catch(() => res.status(400).json({ message: 'Le profil que vous souhaitez supprimer est introuvable !' }));
                        });
                    }
            } else {
                res.status(403).json({message: 'Requête non autorisée ! Vous n\'êtes pas autorisé à supprimer ce profil !'});
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        }); 
};

// Controleur pour la modification d'un profil, uniquement par l'administrateur et le propriétaire du profil
exports.modifyProfil = (req, res, next) => {
    const profilObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete profilObject._userId;
    User.findById(req.auth.userId)
        .then((userAuth) => {
            if (userAuth.isAdmin != false || req.auth.userId === req.params.id) {
                const filenameStock = userAuth.imageUrl.split('/images/')[1];
                // On récupère le contenu du fichier image dans la requête 
                const testReqFile = req.file;
                // S'il n'existe pas, on met simplement à jour les modifications
                if (!testReqFile || filenameStock === "defaultImageProfile.png"){
                    User.updateOne({ _id: req.params.id}, { ...profilObject, _id: req.params.id})
                        .then(() => res.status(200).json({profilObject}))
                        .catch(error => res.status(401).json({ error }));
                } 
                // S'il existe, il faut supprimer l'ancienne image dans le dossier 'images'
                else {
                    User.findById(req.params.id)
                        .then((userParams) => {
                            // On récupère le nom du fichier de l'image du profil dans le dossier images
                            const filenameStock = userParams.imageUrl.split('/images/')[1];
                            // Et, on le supprime avec 'unlink', puis on met à jour les modifications
                            fs.unlink(`images/${filenameStock}`, () => {
                                User.updateOne({ _id: req.params.id}, { ...profilObject, _id: req.params.id})
                                    .then(() => res.status(200).json({profilObject}))
                                    .catch(error => res.status(401).json({ error }));
                            }) 
                        })
                        .catch(error => res.status(401).json({ error }));
                }
            } else {
                res.status(403).json({ message : 'Requête non autorisée !'});
            } 
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Contrôleur pour l'affichage d'un profil, uniquement par l'administrateur et le propriétaire du profil
exports.getOneProfil = (req, res, next) => {
    User.findById(req.auth.userId)
        .then((user) => {
            if (user.isAdmin != false || req.auth.userId === req.params.id) {
                User.findOne({ _id: req.params.id })
                    .then(profil => res.status(200).json(profil))
                    .catch(() => res.status(400).json({ message: 'Le profil demandé est introuvable !' }));
            } else {
                res.status(403).json({message: 'Requête non autorisée ! Vous n\'êtes pas l\'adminitrateur du site ou le propriétaire de ce profil  ! '});
            }
        })    
        .catch( error => {
            res.status(500).json({ error });
        }); 
};

//***********************************************************//
//******La partie qui suit reste à finir de développer******//
//*********************************************************//
// Contrôleur pour l'affichage de tous les profils
exports.getAllProfils = (req, res, next) => {
    User.findById(req.auth.userId)
        .then((user) => {
         //   if (user.isAdmin != false) {
                User.find() // on utilise la méthode find et on renvoie un tableau contenant les Profils de la BDD
                    .then(profils => res.status(200).json(profils))
                    .catch(() => res.status(400).json({ message: 'La liste des profils est introuvable !' }));
           // } else {
             //   res.status(403).json({message: 'Requête non autorisée ! Vous n\'êtes pas l\'administrateur du site !'});
           // }
        })    
        .catch((error) => {
            error,
            res.status(500).json({ message: 'La requête envoyée par le navigateur n\'a pas pu être traitée pour une raison qui n\'a pas pu être identifiée.' });
        }); 
};
    
