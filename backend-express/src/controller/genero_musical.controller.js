const { generoMusicales } = require('../Database/dataBase.orm.js');

// Crear un nuevo género musical
const createGeneroMusical = async (req, res) => {
    try {
        const { genero_musical_text } = req.body;
        const nuevoGenero = await generoMusicales.create({ genero_musical_text });
        res.status(201).json(nuevoGenero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los géneros musicales
const getGenerosMusicales = async (req, res) => {
    try {
        const generos = await generoMusicales.findAll();
        res.status(200).json(generos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un género musical por ID
const getGeneroMusicalById = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await generoMusicales.findByPk(id);
        if (!genero) return res.status(404).json({ error: 'Género musical no encontrado' });
        res.status(200).json(genero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un género musical por ID
const updateGeneroMusical = async (req, res) => {
    try {
        const { id } = req.params;
        const { genero_musical_text } = req.body;
        const genero = await generoMusicales.findByPk(id);
        if (!genero) return res.status(404).json({ error: 'Género musical no encontrado' });

        genero.genero_musical_text = genero_musical_text;
        await genero.save();
        res.status(200).json(genero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un género musical por ID (eliminación física)
const deleteGeneroMusical = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await generoMusicales.findByPk(id);
        if (!genero) return res.status(404).json({ error: 'Género musical no encontrado' });

        await genero.destroy(); // Eliminación física
        res.status(200).json({ message: 'Género musical eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createGeneroMusical,
    getGenerosMusicales,
    getGeneroMusicalById,
    updateGeneroMusical,
    deleteGeneroMusical
};
