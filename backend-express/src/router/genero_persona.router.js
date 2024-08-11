// routes/plataformaRoutes.js
const express = require('express');
const router = express.Router();
const  generoPersonaCtl = require('../controller/genero_persona.controller');

router.get('/generoPersonas',  generoPersonaCtl.mostrar);

module.exports = router;
