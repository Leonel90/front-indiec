const express = require('express');
const router = express.Router();
const eventoController = require('../controller/evento.controller');

// Ruta para crear un nuevo evento
router.post('/eventos', eventoController.crearEvento);

// Ruta para obtener todos los eventos
router.get('/eventos', eventoController.obtenerEventos);

// Ruta para obtener un evento por ID
router.get('/eventos/:id', eventoController.obtenerEventoPorId);

// Ruta para actualizar un evento
router.put('/eventos/:id', eventoController.actualizarEvento);

// Ruta para eliminar un evento (cambiar estado a eliminado)
router.put('/eventos/:id/eliminar', eventoController.eliminarEvento);

// Ruta para restaurar un evento (cambiar estado a activo)
router.put('/eventos/:id/restaurar', eventoController.restaurarEvento);

module.exports = router;
