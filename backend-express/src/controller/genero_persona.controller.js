const {  generoPersonas } = require('../Database/dataBase.orm'); // Ajusta la ruta según sea necesario

const  generoPersonasCtl = {};

// Mostrar todas las plataformas 
generoPersonasCtl.mostrar = async (req, res) => {
  try {
    const listaGeneroPersonas = await  generoPersonas.findAll();
    res.status(200).json(listaGeneroPersonas);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).send("Hubo un error al obtener los eventos");
  }
};
 module.exports =  generoPersonasCtl;