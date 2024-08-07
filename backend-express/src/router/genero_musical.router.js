const express = require('express');
const router = express.Router();
const generoMusicalController = require('../controller/genero_musical.controller');

router.post('/generos', generoMusicalController.createGeneroMusical);
router.get('/generos', generoMusicalController.getGenerosMusicales);
router.get('/generos/:id', generoMusicalController.getGeneroMusicalById);
router.put('/generos/:id', generoMusicalController.updateGeneroMusical);
router.delete('/generos/:id', generoMusicalController.deleteGeneroMusical);

module.exports = router;
    