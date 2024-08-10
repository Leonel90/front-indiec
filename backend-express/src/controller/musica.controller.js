const { musicas } = require('../Database/dataBase.orm');

// Crear una nueva música
const crearMusica = async (req, res) => {
    try {
        const { nombre_musica, nombre_Artista, estado_fk, foto_musica } = req.body;
        if (!nombre_musica || !nombre_Artista || !estado_fk) {
            return res.status(400).json({ message: "Datos incompletos" });
        }
        
        const nuevaMusica = await musicas.create({ nombre_musica, nombre_Artista, estado_fk, foto_musica });
        res.status(201).json(nuevaMusica);
    } catch (error) {
        console.error('Error al crear música:', error);
        res.status(500).json({ message: 'Error al crear la música' });
    }
};

// Obtener todas las músicas
const obtenerMusicas = async (req, res) => {
    try {
        const todasLasMusicas = await musicas.findAll();
        res.status(200).json(todasLasMusicas);
    } catch (error) {
        console.error("Error al obtener músicas:", error);
        res.status(500).json({ message: "Error al obtener músicas" });
    }
};

// Obtener una música por ID
const obtenerMusicaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const musicaItem = await musicas.findByPk(id);
        if (musicaItem) {
            res.status(200).json(musicaItem);
        } else {
            res.status(404).json({ message: "Música no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener música:", error);
        res.status(500).json({ message: "Error al obtener música" });
    }
};

// Actualizar una música
const actualizarMusica = async (req, res) => {
    const { id } = req.params;
    try {
        const [actualizado] = await musicas.update(req.body, {
            where: { id_Musica: id }
        });
        if (actualizado) {
            const musicaActualizada = await musicas.findByPk(id);
            res.status(200).json(musicaActualizada);
        } else {
            res.status(404).json({ message: "Música no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar música:", error);
        res.status(500).json({ message: "Error al actualizar música" });
    }
};

// Eliminar una música (lógica)
const eliminarMusica = async (req, res) => {
    const { id } = req.params;
    try {
        const musicaItem = await musicas.findByPk(id);
        if (musicaItem) {
            await musicaItem.update({ estado_fk: 2 }); // Cambia el estado a "Eliminado"
            res.status(200).json({ message: "Música eliminada" });
        } else {
            res.status(404).json({ message: "Música no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar música:", error);
        res.status(500).json({ message: "Error al eliminar música" });
    }
};

// Restaurar una música
const restaurarMusica = async (req, res) => {
    const { id } = req.params;
    try {
        const musicaItem = await musicas.findByPk(id);
        if (musicaItem) {
            await musicaItem.update({ estado_fk: 1 }); // Cambia el estado a "Activo"
            res.status(200).json({ message: "Música restaurada" });
        } else {
            res.status(404).json({ message: "Música no encontrada" });
        }
    } catch (error) {
        console.error("Error al restaurar música:", error);
        res.status(500).json({ message: "Error al restaurar música" });
    }
};

module.exports = {
    crearMusica,
    obtenerMusicas,
    obtenerMusicaPorId,
    actualizarMusica,
    eliminarMusica,
    restaurarMusica
};
