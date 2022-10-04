const express = require('express');
// Permet de créer des routeurs séparés
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteProfil);
router.get('/:id', auth, userCtrl.getOneProfil);
// Requête GET | Afficher tous les profils
router.get('/', auth, userCtrl.getAllProfils);
router.put('/:id', auth, multer, userCtrl.modifyProfil);

module.exports = router;