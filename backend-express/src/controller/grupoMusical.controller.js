const { grupo_musical } = require('../Database/dataBase.orm');

// Crear un nuevo grupo musical
const crearGrupoMusical = async (req, res) => {
    try {
        const { nombre_grupo, descripcion, foto_grupo, url, estado_fk, plataforma_fk } = req.body;
        if (!nombre_grupo || !estado_fk || !plataforma_fk) {
            return res.status(400).json({ message: "Datos incompletos" });
        }
        
        const nuevoGrupoMusical = await grupo_musical.create({ nombre_grupo, descripcion, foto_grupo, url, estado_fk, plataforma_fk });
        res.status(201).json(nuevoGrupoMusical);
    } catch (error) {
        console.error('Error al crear grupo musical:', error);
        res.status(500).json({ message: 'Error al crear el grupo musical' });
    }
};

// Obtener todos los grupos musicales
const obtenerGruposMusicales = async (req, res) => {
    try {
        const todosLosGruposMusicales = await grupo_musical.findAll();
        res.status(200).json(todosLosGruposMusicales);
    } catch (error) {
        console.error("Error al obtener grupos musicales:", error);
        res.status(500).json({ message: "Error al obtener grupos musicales" });
    }
};

// Obtener un grupo musical por ID
const obtenerGrupoMusicalPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const grupoMusicalItem = await grupo_musical.findByPk(id);
        if (grupoMusicalItem) {
            res.status(200).json(grupoMusicalItem);
        } else {
            res.status(404).json({ message: "Grupo musical no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener grupo musical:", error);
        res.status(500).json({ message: "Error al obtener grupo musical" });
    }
};

// Actualizar un grupo musical
const actualizarGrupoMusical = async (req, res) => {
    const { id } = req.params;
    try {
        const [actualizado] = await grupo_musical.update(req.body, {
            where: { id_GrupoMusical: id }
        });
        if (actualizado) {
            const grupoMusicalActualizado = await grupo_musical.findByPk(id);
            res.status(200).json(grupoMusicalActualizado);
        } else {
            res.status(404).json({ message: "Grupo musical no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar grupo musical:", error);
        res.status(500).json({ message: "Error al actualizar grupo musical" });
    }
};

// Eliminar un grupo musical (lógica)
const eliminarGrupoMusical = async (req, res) => {
    const { id } = req.params;
    try {
        const grupoMusicalItem = await grupo_musical.findByPk(id);
        if (grupoMusicalItem) {
            await grupoMusicalItem.update({ estado_fk: 2 }); // Cambia el estado a "Eliminado"
            res.status(200).json({ message: "Grupo musical eliminado" });
        } else {
            res.status(404).json({ message: "Grupo musical no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar grupo musical:", error);
        res.status(500).json({ message: "Error al eliminar grupo musical" });
    }
};

// Restaurar un grupo musical
const restaurarGrupoMusical = async (req, res) => {
    const { id } = req.params;
    try {
        const grupoMusicalItem = await grupo_musical.findByPk(id);
        if (grupoMusicalItem) {
            await grupoMusicalItem.update({ estado_fk: 1 }); // Cambia el estado a "Activo"
            res.status(200).json({ message: "Grupo musical restaurado" });
        } else {
            res.status(404).json({ message: "Grupo musical no encontrado" });
        }
    } catch (error) {
        console.error("Error al restaurar grupo musical:", error);
        res.status(500).json({ message: "Error al restaurar grupo musical" });
    }
};

module.exports = {
    crearGrupoMusical,
    obtenerGruposMusicales,
    obtenerGrupoMusicalPorId,
    actualizarGrupoMusical,
    eliminarGrupoMusical,
    restaurarGrupoMusical
};
