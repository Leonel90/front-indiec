const { DataTypes } = require('sequelize');
const segundoComentario = (sequelize) => {
  return sequelize.define('Segundo_Comentario', {
    id_comentario_s: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: 'ID del comentario'
    },
    text_comentario_s: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Texto del comentario'
    },
    fecha_comentario: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Fecha del comentario'
    }
  }, {
    timestamps: false,
    comment: 'Tabla para almacenar los comentarios secundarios'
  });
};

module.exports = segundoComentario; 
