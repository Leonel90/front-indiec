const express = require('express');
const router = express.Router();
const albumController = require('../controller/album.controller');

// Ruta para crear un nuevo álbum
router.post('/albums', albumController.crearAlbum);

// Ruta para obtener todos los álbumes
router.get('/albums', albumController.obtenerAlbums);

// Ruta para obtener un álbum por ID
router.get('/albums/:id', albumController.obtenerAlbumPorId);

// Ruta para actualizar un álbum
router.put('/albums/:id', albumController.actualizarAlbum);

// Ruta para eliminar un álbum (cambiar estado a inactivo)
router.put('/albums/:id/eliminar', albumController.eliminarAlbum);

// Ruta para restaurar un álbum (cambiar estado a activo)
router.put('/albums/:id/restaurar', albumController.restaurarAlbum);

module.exports = router;
