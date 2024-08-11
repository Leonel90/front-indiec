const express = require('express');
const router = express.Router();
const grupoMusicalController = require('../controller/grupoMusical.controller');

// Ruta para crear un nuevo grupo musical
router.post('/grupos-musicales', grupoMusicalController.crearGrupoMusical);

// Ruta para obtener todos los grupos musicales
router.get('/grupos-musicales', grupoMusicalController.obtenerGruposMusicales);

// Ruta para obtener un grupo musical por ID
router.get('/grupos-musicales/:id', grupoMusicalController.obtenerGrupoMusicalPorId);

// Ruta para actualizar un grupo musical
router.put('/grupos-musicales/:id', grupoMusicalController.actualizarGrupoMusical);

// Ruta para eliminar un grupo musical (cambiar estado a inactivo)
router.put('/grupos-musicales/:id/eliminar', grupoMusicalController.eliminarGrupoMusical);

// Ruta para restaurar un grupo musical (cambiar estado a activo)
router.put('/grupos-musicales/:id/restaurar', grupoMusicalController.restaurarGrupoMusical);

module.exports = router;
