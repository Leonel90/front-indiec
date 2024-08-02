const detalleComentarioComentarios = (sequelize, type) => {
    return sequelize.define('detalle_comentario_comentario', {
        
        id_comentario_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'comentario_eventos',
                key: 'id_comentario' 
            },
            comment: 'Clave foránea del comentario principal'
        },
        comentario_s_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'segundo_comentarios', 
                key: 'id_comentario_s' 
            },
            comment: 'Clave foránea del comentario secundario'
        }
    }, {
        timestamps: false,
        comment: 'Tabla para almacenar los detalles de los comentarios relacionados'
    });
};

module.exports = detalleComentarioComentarios;
