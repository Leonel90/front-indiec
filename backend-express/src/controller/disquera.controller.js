const { disqueras } = require('../Database/dataBase.orm'); // Ajusta la ruta según sea necesario

const disquerasCtl = {};

// Mostrar todas las disqueras
disquerasCtl.mostrar = async (req, res) => {
  try {
    const listaDisqueras = await disqueras.findAll();
    res.status(200).json(listaDisqueras);
  } catch (error) {
    console.error("Error al obtener las disqueras:", error);
    res.status(500).send("Hubo un error al obtener las disqueras");
  }
};


// Crear una nueva disquera
disquerasCtl.crear = async (req, res) => {
  // Manejo de archivo subido
  const { file } = req;
  const { Nombre_disquera, Descripcion_disquera, Url, estado_fk } = req.body;

  try {
    const fotoDisquera = file ? file.filename : null; // Nombre del archivo subido (ajustar según configuración de multer)

    await disqueras.create({ 
      Foto_disquera: fotoDisquera, 
      Nombre_disquera, 
      Descripcion_disquera, 
      Url, 
      estado_fk 
    });

    res.status(201).send("Disquera creada con éxito");
  } catch (error) {
    console.error("Error al crear la disquera:", error);
    res.status(500).send("Hubo un error al crear la disquera");
  }
};

// Obtener una disquera por ID
disquerasCtl.obtenerPorId = async (req, res) => {
  const { id } = req.params;

  console.log("ID recibido:", id); // Añadir este log para verificar el ID recibido

  try {
    const disqueraEncontrada = await disqueras.findByPk(id);

    if (!disqueraEncontrada) {
      return res.status(404).json({ message: 'Disquera no encontrada' });
    }
    res.status(200).json(disqueraEncontrada);
  } catch (error) {
    console.error("Error al obtener la disquera:", error);
    res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
  }
};

// Eliminar una disquera (lógica, cambia el estado a 'eliminado')
disquerasCtl.eliminar = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await disqueras.update(
      { estado: 'eliminado' },
      { where: { id_Disquera: id } }
    );

    if (result[0] > 0) {
      res.status(200).send("Disquera eliminada con éxito");
    } else {
      res.status(404).send("Disquera no encontrada");
    }
  } catch (error) {
    console.error("Error al eliminar la disquera:", error);
    res.status(500).send("Hubo un error al eliminar la disquera");
  }
};

// Actualizar una disquera por ID
disquerasCtl.actualizar = async (req, res) => {
  const { id } = req.params;
  const { Foto_disquera, Nombre_disquera, Descripcion_disquera, Url, estado } = req.body;

  try {
    const result = await disqueras.update(
      { Foto_disquera, Nombre_disquera, Descripcion_disquera, Url, estado },
      { where: { id_Disquera: id } }
    );

    if (result[0] > 0) {
      res.status(200).send("Disquera actualizada con éxito");
    } else {
      res.status(404).send("Disquera no encontrada");
    }
  } catch (error) {
    console.error("Error al actualizar la disquera:", error);
    res.status(500).send("Hubo un error al actualizar la disquera");
  }
};

module.exports = disquerasCtl;
