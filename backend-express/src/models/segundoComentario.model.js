const segundoComentario = (sequelize, type) => {
  return sequelize.define('segundo_comentarios', {
      id_comentario_s: {
          type: type.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: 'ID del comentario'
      },
      text_comentario_s: {
          type: type.TEXT,
          allowNull: true,
          comment: 'Texto del comentario'
      },
      fecha_comentario: {
          type: type.DATE,
          allowNull: true,
          comment: 'Fecha del comentario'
      }
  }, {
      timestamps: false,
      comment: 'Tabla para almacenar los comentarios secundarios'
  });
};

module.exports = segundoComentario;