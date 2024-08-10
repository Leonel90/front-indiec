const express = require('express');
const router = express.Router();
const disquerasCtl = require('../controller/disquera.controller'); // Ajusta la ruta según sea necesario

// Obtener todas las disqueras
router.get('/disqueras', disquerasCtl.mostrar);

// Crear una nueva disquera
router.post('/disqueras', disquerasCtl.crear);

// Obtener una disquera por ID
router.get('/disqueras/:id', disquerasCtl.obtenerPorId);

// Eliminar una disquera por ID (lógica)
router.delete('/disqueras/:id', disquerasCtl.eliminar);

// Actualizar una disquera por ID
router.put('/disqueras/:id', disquerasCtl.actualizar);

module.exports = router;
