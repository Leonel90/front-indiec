const detalleComentarioComentarios = (sequelize, type) => {
    return sequelize.define('detalle_comentario_comentarios', {
        id_comentario_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'comentario_evento', // Nombre de la tabla referenciada
                key: 'id_comentario'        // Clave primaria en la tabla referenciada
            },
            comment: 'Clave foránea del comentario principal'
        },
        comentario_s_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'segundo_comentarios', // Nombre de la tabla referenciada
                key: 'id_comentario_s'         // Clave primaria en la tabla referenciada
            },
            comment: 'Clave foránea del comentario secundario'
        }
    }, {
        timestamps: false,
        comment: 'Tabla para almacenar los detalles de los comentarios relacionados'
    });
};

module.exports = detalleComentarioComentarios;