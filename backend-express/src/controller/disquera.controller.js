const { disqueras } = require('../Database/dataBase.orm');

// Crear una nueva disquera
const crearDisquera = async (req, res) => {
    try {
        const { Nombre_disquera, Descripcion_disquera, Foto_disquera, Url, estado_fk, plataforma_fk } = req.body;
        if (!Nombre_disquera || !estado_fk || !plataforma_fk) {
            return res.status(400).json({ message: "Datos incompletos" });
        }
        
        const nuevaDisquera = await disqueras.create({ Nombre_disquera, Descripcion_disquera, Foto_disquera, Url, estado_fk, plataforma_fk });
        res.status(201).json(nuevaDisquera);
    } catch (error) {
        console.error('Error al crear disquera:', error);
        res.status(500).json({ message: 'Error al crear la disquera' });
    }
};

// Obtener todas las disqueras
const obtenerDisqueras = async (req, res) => {
    try {
        const todasLasDisqueras = await disqueras.findAll();
        res.status(200).json(todasLasDisqueras);
    } catch (error) {
        console.error("Error al obtener disqueras:", error);
        res.status(500).json({ message: "Error al obtener disqueras" });
    }
};

// Obtener una disquera por ID
const obtenerDisqueraPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const disqueraItem = await disqueras.findByPk(id);
        if (disqueraItem) {
            res.status(200).json(disqueraItem);
        } else {
            res.status(404).json({ message: "Disquera no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener disquera:", error);
        res.status(500).json({ message: "Error al obtener disquera" });
    }
};

// Actualizar una disquera
const actualizarDisquera = async (req, res) => {
    const { id } = req.params;
    try {
        const [actualizado] = await disqueras.update(req.body, {
            where: { id_Disquera: id }
        });
        if (actualizado) {
            const disqueraActualizada = await disqueras.findByPk(id);
            res.status(200).json(disqueraActualizada);
        } else {
            res.status(404).json({ message: "Disquera no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar disquera:", error);
        res.status(500).json({ message: "Error al actualizar disquera" });
    }
};

// Eliminar una disquera (lógica)
const eliminarDisquera = async (req, res) => {
    const { id } = req.params;
    try {
        const disqueraItem = await disqueras.findByPk(id);
        if (disqueraItem) {
            await disqueraItem.update({ estado_fk: 2 }); // Cambia el estado a "Eliminado"
            res.status(200).json({ message: "Disquera eliminada" });
        } else {
            res.status(404).json({ message: "Disquera no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar disquera:", error);
        res.status(500).json({ message: "Error al eliminar disquera" });
    }
};

// Restaurar una disquera
const restaurarDisquera = async (req, res) => {
  const { id } = req.params;
  try {
      const disqueraItem = await disqueras.findByPk(id);
      if (disqueraItem) {
          await disqueraItem.update({ estado_fk: 1 }); // Cambia el estado a "Activo"
          res.status(200).json({ message: "Disquera restaurada" });
      } else {
          res.status(404).json({ message: "Disquera no encontrada" });
      }
  } catch (error) {
      console.error("Error al restaurar disquera:", error);
      res.status(500).json({ message: "Error al restaurar disquera" });
  }
};

module.exports = {
    crearDisquera,
    obtenerDisqueras,
    obtenerDisqueraPorId,
    actualizarDisquera,
    eliminarDisquera,
    restaurarDisquera
};
