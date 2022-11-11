const express = require('express');
// Permet de créer des routeurs séparés
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user');

// Requête POST | Inscription d'un utilisateur
router.post('/signup', userCtrl.signup);
// Requête POST | Connexion d'un utilisateur
router.post('/login', userCtrl.login);
// Requête DELETE | Suppression d'un profil
router.delete('/:id', auth, userCtrl.deleteProfil);
// Requête GET | Affichage d'un profil
router.get('/:id', auth, userCtrl.getOneProfil);
// Requête GET | Afficher tous les profils
router.get('/', auth, userCtrl.getAllProfils);
// Requête PUT | Modifier un profil
router.put('/:id', auth, multer, userCtrl.modifyProfil);

module.exports = router;