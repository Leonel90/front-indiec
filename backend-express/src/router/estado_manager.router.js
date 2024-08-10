const express = require('express');
const router = express.Router();
const estadoManagerCtl = require('../controller/estado_manager.controller');

// Ruta para obtener todos los estados
router.get('/estadoManager', estadoManagerCtl.mostrar);

module.exports = router;
