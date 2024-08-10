const { plataformas } = require('../Database/dataBase.orm'); // Ajusta la ruta según sea necesario

const plataformasCtl = {};

// Mostrar todas las plataformas 
plataformasCtl.mostrar = async (req, res) => {
  try {
    const listaPlataformas = await plataformas.findAll();
    res.status(200).json(listaPlataformas);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).send("Hubo un error al obtener los eventos");
  }
};
 module.exports = plataformasCtl;