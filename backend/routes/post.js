const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postCtrl = require('../controllers/post');
// Requête POST | Création d'un post
router.post('/', auth, multer, postCtrl.createPost);
// Requête PUT | Mise à jour / modification d'un post exitant
router.put('/:id', auth, multer, postCtrl.modifyPost);
// Requête DELETE | Suppression d'un post existant
router.delete('/:id', auth, postCtrl.deletePost);
// Requête GET | Afficher un post spécifique
router.get('/:id', auth, postCtrl.getOnePost);
// Requête GET | Afficher tous les posts
router.get('/', auth, postCtrl.getAllPosts);

// Requête POST | Gestion likes & dislikes
router.post("/:id/like", auth, postCtrl.manageLike);

// On exporte les routers
module.exports = router;