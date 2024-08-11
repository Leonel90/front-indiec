const express = require('express');
const router = express.Router();
const {
    crearDisquera,
    obtenerDisqueras,
    obtenerDisqueraPorId,
    actualizarDisquera,
    eliminarDisquera,
    restaurarDisquera
} = require('../controller/disquera.controller');

// Ruta para crear una nueva disquera
router.post('/disqueras', crearDisquera);

// Ruta para obtener todas las disqueras
router.get('/disqueras', obtenerDisqueras);

// Ruta para obtener una disquera por ID
router.get('/disqueras/:id', obtenerDisqueraPorId);

// Ruta para actualizar una disquera por ID
router.put('/disqueras/:id', actualizarDisquera);

// Ruta para eliminar una disquera (eliminación lógica)
router.delete('/disqueras/:id', eliminarDisquera);

// Ruta para restaurar una disquera por ID
router.put('/disqueras/restore/:id', restaurarDisquera);

module.exports = router;
