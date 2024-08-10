const { estadoManagers } = require('../Database/dataBase.orm'); // Ajusta la ruta según sea necesario

const estadoManagersCtl = {};

// Mostrar todos los eventos
estadoManagersCtl.mostrar = async (req, res) => {
  try {
    const listaEstadoManagers = await estadoManagers.findAll();
    res.status(200).json(listaEstadoManagers);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).send("Hubo un error al obtener los eventos");
  }
};
 module.exports = estadoManagersCtl;