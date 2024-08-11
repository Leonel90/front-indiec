const { eventos } = require('../Database/dataBase.orm');

// Crear un nuevo evento
const crearEvento = async (req, res) => {
    try {
        const { Foto_evento, Nombre_evento, Descripcion, Ubicacion, Fecha, Contacto, Capacidad, Artistas, estado_fk } = req.body;
        if (!Nombre_evento || !Fecha || !estado_fk) {
            return res.status(400).json({ message: "Datos incompletos" });
        }

        const nuevoEvento = await eventos.create({ Foto_evento, Nombre_evento, Descripcion, Ubicacion, Fecha, Contacto, Capacidad, Artistas, estado_fk });
        res.status(201).json(nuevoEvento);
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ message: 'Error al crear el evento' });
    }
};

// Obtener todos los eventos
const obtenerEventos = async (req, res) => {
    try {
        const todosLosEventos = await eventos.findAll();
        res.status(200).json(todosLosEventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ message: "Error al obtener eventos" });
    }
};

// Obtener un evento por ID
const obtenerEventoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const eventoItem = await eventos.findByPk(id);
        if (eventoItem) {
            res.status(200).json(eventoItem);
        } else {
            res.status(404).json({ message: "Evento no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener evento:", error);
        res.status(500).json({ message: "Error al obtener evento" });
    }
};

// Actualizar un evento
const actualizarEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const [actualizado] = await eventos.update(req.body, {
            where: { id_Evento: id }
        });
        if (actualizado) {
            const eventoActualizado = await eventos.findByPk(id);
            res.status(200).json(eventoActualizado);
        } else {
            res.status(404).json({ message: "Evento no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar evento:", error);
        res.status(500).json({ message: "Error al actualizar evento" });
    }
};

// Eliminar un evento (lógica)
const eliminarEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const eventoItem = await eventos.findByPk(id);
        if (eventoItem) {
            await eventoItem.update({ estado_fk: 2 }); // Cambia el estado a "Eliminado"
            res.status(200).json({ message: "Evento eliminado" });
        } else {
            res.status(404).json({ message: "Evento no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar evento:", error);
        res.status(500).json({ message: "Error al eliminar evento" });
    }
};

// Restaurar un evento
const restaurarEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const eventoItem = await eventos.findByPk(id);
        if (eventoItem) {
            await eventoItem.update({ estado_fk: 1 }); // Cambia el estado a "Activo"
            res.status(200).json({ message: "Evento restaurado" });
        } else {
            res.status(404).json({ message: "Evento no encontrado" });
        }
    } catch (error) {
        console.error("Error al restaurar evento:", error);
        res.status(500).json({ message: "Error al restaurar evento" });
    }
};

module.exports = {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento,
    restaurarEvento
};
