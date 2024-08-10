const express = require('express');
const router = express.Router();
const musicaController = require('../controller/musica.controller');

// Ruta para crear una nueva música
router.post('/musicas', musicaController.crearMusica);

// Ruta para obtener todas las músicas
router.get('/musicas', musicaController.obtenerMusicas);

// Ruta para obtener una música por ID
router.get('/musicas/:id', musicaController.obtenerMusicaPorId);

// Ruta para actualizar una música
router.put('/musicas/:id', musicaController.actualizarMusica);

// Ruta para eliminar una música (cambiar estado a inactivo)
router.put('/musicas/:id/eliminar', musicaController.eliminarMusica);

// Ruta para restaurar una música (cambiar estado a activo)
router.put('/musicas/:id/restaurar', musicaController.restaurarMusica);

module.exports = router;
