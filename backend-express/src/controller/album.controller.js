const { albums } = require('../Database/dataBase.orm');

// Crear un nuevo álbum
const crearAlbum = async (req, res) => {
    try {
        const { foto_album, nombre_album, grupo_musical, integrantes, url, estado_fk } = req.body;
        if (!nombre_album || !grupo_musical || !estado_fk) {
            return res.status(400).json({ message: "Datos incompletos" });
        }

        const nuevoAlbum = await albums.create({ foto_album, nombre_album, grupo_musical, integrantes, url, estado_fk });
        res.status(201).json(nuevoAlbum);
    } catch (error) {
        console.error('Error al crear el álbum:', error);
        res.status(500).json({ message: 'Error al crear el álbum' });
    }
};

// Obtener todos los álbumes
const obtenerAlbums = async (req, res) => {
    try {
        const todosLosAlbums = await albums.findAll();
        res.status(200).json(todosLosAlbums);
    } catch (error) {
        console.error("Error al obtener álbumes:", error);
        res.status(500).json({ message: "Error al obtener álbumes" });
    }
};

// Obtener un álbum por ID
const obtenerAlbumPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const albumItem = await albums.findByPk(id);
        if (albumItem) {
            res.status(200).json(albumItem);
        } else {
            res.status(404).json({ message: "Álbum no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el álbum:", error);
        res.status(500).json({ message: "Error al obtener el álbum" });
    }
};

// Actualizar un álbum
const actualizarAlbum = async (req, res) => {
    const { id } = req.params;
    try {
        const [actualizado] = await albums.update(req.body, {
            where: { id_Album: id }
        });
        if (actualizado) {
            const albumActualizado = await albums.findByPk(id);
            res.status(200).json(albumActualizado);
        } else {
            res.status(404).json({ message: "Álbum no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el álbum:", error);
        res.status(500).json({ message: "Error al actualizar el álbum" });
    }
};

// Eliminar un álbum (lógica)
const eliminarAlbum = async (req, res) => {
    const { id } = req.params;
    try {
        const albumItem = await albums.findByPk(id);
        if (albumItem) {
            await albumItem.update({ estado_fk: 2 }); // Cambia el estado a "Eliminado"
            res.status(200).json({ message: "Álbum eliminado" });
        } else {
            res.status(404).json({ message: "Álbum no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el álbum:", error);
        res.status(500).json({ message: "Error al eliminar el álbum" });
    }
};

// Restaurar un álbum
const restaurarAlbum = async (req, res) => {
    const { id } = req.params;
    try {
        const albumItem = await albums.findByPk(id);
        if (albumItem) {
            await albumItem.update({ estado_fk: 1 }); // Cambia el estado a "Activo"
            res.status(200).json({ message: "Álbum restaurado" });
        } else {
            res.status(404).json({ message: "Álbum no encontrado" });
        }
    } catch (error) {
        console.error("Error al restaurar el álbum:", error);
        res.status(500).json({ message: "Error al restaurar el álbum" });
    }
};

module.exports = {
    crearAlbum,
    obtenerAlbums,
    obtenerAlbumPorId,
    actualizarAlbum,
    eliminarAlbum,
    restaurarAlbum
};
