const comentarioEvento = (sequelize, type) => {
    return sequelize.define('comentario_evento', {
        id_comentario: {
            type:type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID del comentario'
        },
        texto_comentario: {
            type: type.TEXT,
            allowNull: false,
            comment: 'Texto del comentario'
        },
        fecha_comentario: {
            type: type.DATE,
            allowNull: false,
            comment: 'Fecha del comentario'
        },
        eventos_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'eventos', // Verifica que esta tabla exista y tenga la columna correcta
                key: 'id_evento'  // Asegúrate de que esta columna sea del tipo INTEGER
            },
            comment: 'Clave foránea que referencia al evento'
        }
    }, {
        timestamps: false,
        comment: 'Tabla para almacenar los comentarios de eventos'
    });
};

module.exports = comentarioEvento;