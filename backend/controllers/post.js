// On importe le modèle Post
const Post = require('../models/Post');
// On importe le modèle Utilisateur
const User = require('../models/User');
// On inclut le module fs (filesystem) de Node js pour la gestion des fichiers
const fs = require('fs');

exports.createPost = (req, res, next) => {
  const postObject = req.file ? {
    ...req.body.post,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : { ...req.body };
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
        ...req.body,
        ...postObject,
        ...req.file,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save() //on utilise la méthode save pour enregistrer Post dans la base de données, elle renvoie une promise
        .then(() => { res.status(201).json({ post })}) // on renvoie une réponse de réussite
        .catch(error => { res.status(400).json({ error })}); // on renvoie la réponse d'erreur générée automatiquement par Mongoose et un code erreur 400
};

// Controleur pour la modification d'un post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete postObject._userId;
    Post.findOne({_id: req.params.id})
        .then((post) => {
          User.findById(req.auth.userId)
            .then(user => {
              // On vérifie si l'auteur du post est bien la personne connectée ou si la personne connectée est l'admin
              // si ce n'est pas le cas, on renvoie un message d'erreur
              if(user.isAdmin != false || post.userId === req.auth.userId) {
                // On récupère le contenu du fichier image dans la requête 
                const testReqFile = req.file;
                // S'il n'existe pas, on met simplement à jour les modifications
                if (!testReqFile){
                   Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                       .then(() => res.status(200).json({postObject}))
                       .catch(error => res.status(401).json({ error }));
                } 
                // S'il existe, il faut supprimer l'ancienne image dans le dossier 'images'
                else {
                   // On récupère le nom du fichier de l'image du post dans le dossier images
                   const filenameStock = post.imageUrl.split('/images/')[1];
                   // Et, on le supprime avec 'unlink', puis on met à jour les modifications
                   fs.unlink(`images/${filenameStock}`, () => {
                       Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                       .then(() => res.status(200).json({postObject}))
                       .catch(error => res.status(401).json({ error }));
                   }) 
                }  
              } 
              // // si ce n'est pas le cas, on renvoie un message d'erreur
              else {
                res.status(403).json({ message : 'Requête non autorisée !'});   
              }
            })
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Controleur pour la suppression d'un post, uniquement par l'administrateur et le propriétaire du profil
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
       .then(post => {
          User.findById(req.auth.userId)
            .then(user => {
                if(user.isAdmin != false || post.userId === req.auth.userId) {
                  const filenameStock = post.imageUrl.split('/images/')[1];
                  // On supprime le fichier image du post
                  fs.unlink(`images/${filenameStock}`, () => {
                      Post.deleteOne({_id: req.params.id})
                          .then(() => res.status(200).json({message: 'Post supprimé !'}))
                          .catch(() => res.status(401).json({ message: 'Autorisation requise !' }));
                  });
                } else {
                  res.status(403).json({message: 'Requête non autorisée !'});
                }
            })
            .catch(() => res.status(403).json({ message: 'Requête non autorisée !' }));
        })
       .catch( error => {
           res.status(500).json({ error });
       });
};

// Controleur pour l'affichage d'un post
exports.getOnePost = (req, res, next) =>{
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

// Controleur pour l'affichage de tous les posts
exports.getAllPosts = (req, res, next) => {
    Post.find() // on utilise la méthode find et on renvoie un tableau contenant les Posts de la BDD
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

// Controleur pour gérer les likes et dislikes
exports.manageLike = (req, res, next) => {
    // On récupère l'userId
    let userId = req.body.userId;
    // On récupère le postId
    let postId = req.params.id;
    // On récupère le like de la requête du body
    let like = req.body.like;
   
    if (like === 1) {
      // Si l'utilisateur clique sur le pouce Like pour la première fois
      // => on met à jour le post ayant cet Id
      Post.updateOne(
        { _id: postId },
        {
          // [ mongoDB push operator ]
          // On ajoute (on pousse) l'userId au tableau [array] des usersLiked
          $push: { usersLiked: userId },
          // [ mongoDB increment operator ]
          // On incrémente likes
          $inc: { likes: +1 },
        }
      )
        .then(() => res.status(200).json({ userId, postId, like }))
        .catch((error) => res.status(400).json({ error }));
    }
   
    // if (like === -1) {
    //   // Si l'utilisateur clique sur le pouce disLike pour la première fois
    //   // => on met à jour le post ayant cet Id
    //   Post.updateOne(
    //     { _id: postId },
    //     {
    //       // [ mongoDB push operator ]
    //       // On ajoute (on pousse) l'userId au tableau [array] des usersDisliked
    //       $push: { usersDisliked: userId },
    //       // [ mongoDB increment operator ]
    //       // On incrémente dislikes
    //       $inc: { dislikes: +1 },
    //     }
    //   )
    //     .then(() => res.status(200).json({ message: "Dislike ajouté par l'utilisateur !" }))
    //     .catch((error) => res.status(400).json({ error }));
    // }
   
    // Suppression like
    if (like === 0) {
      Post.findOne({
        _id: postId,
      })
        .then((post) => {
          // Suppression like
          // Si l'utilisateur a déjà cliqué sur le pouce like donc si l'userId est inclus dans le tableau des usersLiked
          if (post.usersLiked.includes(userId)) {
            Post.updateOne(
              { _id: postId },
              // [ mongoDB pull operator ]
              // On supprime l'userId du tableau des usersLiked et on décrémente likes
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then(() => res.status(200).json({ message: "Like retiré par l'utilisateur !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          // // Suppresson dislike
          // // Si l'utilisateur a déjà cliqué sur le pouce disLike donc si l'userId est inclus dans le tableau des usersDisliked
          // if (post.usersDisliked.includes(userId)) {
          //   Post.updateOne(
          //     { _id: postId },
          //     // [ mongoDB pull operator ]
          //     // On supprime l'userId du tableau des usersDisliked et on décrémente disLikes
          //     { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          //   )
          //     .then(() => res.status(200).json({ message: "Dislike retiré par l'utilisateur !" }))
          //     .catch((error) => res.status(400).json({ error }));
          // }
        })
        .catch((error) => res.status(400).json({ error }));
    }
  };