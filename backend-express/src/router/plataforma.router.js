// routes/plataformaRoutes.js
const express = require('express');
const router = express.Router();
const plataformaCtl = require('../controller/plataforma.controller');

router.get('/plataformas', plataformaCtl.mostrar);

module.exports = router;
