const express = require('express');
const router = express.Router();
const managerController = require('../controller/maneger.controller'); // Ajusta la ruta según sea necesario

// Ruta para crear un nuevo manager
router.post('/managers', managerController.crearManager);

// Ruta para obtener todos los managers
router.get('/managers', managerController.obtenerManagers);

// Ruta para obtener un manager por ID
router.get('/managers/:id', managerController.obtenerManagerPorId);

// Ruta para actualizar un manager
router.put('/managers/:id', managerController.actualizarManager);

// Ruta para eliminar un manager (cambiar estado a inactivo)
router.put('/managers/:id/eliminar', managerController.eliminarManager);

// Ruta para restaurar un manager (cambiar estado a activo)
router.put('/managers/:id/restaurar', managerController.restaurarManager);

module.exports = router;
