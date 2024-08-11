const { managers } = require('../Database/dataBase.orm');

// Crear un nuevo manager
const crearManager = async (req, res) => {
    try {
        const { Foto_manager, Apellidos, Nombres, Email, genero_fk, estado_fk } = req.body;
        if (!Apellidos || !Nombres || !Email || !genero_fk || !estado_fk) {
            return res.status(400).json({ message: "Datos incompletos" });
        }
        
        const nuevoManager = await managers.create({ Foto_manager, Apellidos, Nombres, Email, genero_fk, estado_fk });
        res.status(201).json(nuevoManager);
    } catch (error) {
        console.error('Error al crear manager:', error);
        res.status(500).json({ message: 'Error al crear el manager' });
    }
};

// Obtener todos los managers
const obtenerManagers = async (req, res) => {
    try {
        const todosLosManagers = await managers.findAll();
        res.status(200).json(todosLosManagers);
    } catch (error) {
        console.error("Error al obtener managers:", error);
        res.status(500).json({ message: "Error al obtener managers" });
    }
};

// Obtener un manager por ID
const obtenerManagerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const managerItem = await managers.findByPk(id);
        if (managerItem) {
            res.status(200).json(managerItem);
        } else {
            res.status(404).json({ message: "Manager no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener manager:", error);
        res.status(500).json({ message: "Error al obtener manager" });
    }
};

// Actualizar un manager
const actualizarManager = async (req, res) => {
    const { id } = req.params;
    try {
        const [actualizado] = await managers.update(req.body, {
            where: { id_Manager: id }
        });
        if (actualizado) {
            const managerActualizado = await managers.findByPk(id);
            res.status(200).json(managerActualizado);
        } else {
            res.status(404).json({ message: "Manager no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar manager:", error);
        res.status(500).json({ message: "Error al actualizar manager" });
    }
};

// Eliminar un manager (lógica)
const eliminarManager = async (req, res) => {
    const { id } = req.params;
    try {
        const managerItem = await managers.findByPk(id);
        if (managerItem) {
            await managerItem.update({ estado_fk: 2 }); // Cambia el estado a "Eliminado"
            res.status(200).json({ message: "Manager eliminado" });
        } else {
            res.status(404).json({ message: "Manager no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar manager:", error);
        res.status(500).json({ message: "Error al eliminar manager" });
    }
};

// Restaurar un manager
const restaurarManager = async (req, res) => {
    const { id } = req.params;
    try {
        const managerItem = await managers.findByPk(id);
        if (managerItem) {
            await managerItem.update({ estado_fk: 1 }); // Cambia el estado a "Activo"
            res.status(200).json({ message: "Manager restaurado" });
        } else {
            res.status(404).json({ message: "Manager no encontrado" });
        }
    } catch (error) {
        console.error("Error al restaurar manager:", error);
        res.status(500).json({ message: "Error al restaurar manager" });
    }
};

module.exports = {
    crearManager,
    obtenerManagers,
    obtenerManagerPorId,
    actualizarManager,
    eliminarManager,
    restaurarManager
};
