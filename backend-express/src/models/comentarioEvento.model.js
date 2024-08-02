const comentarioEvento = (sequelize, DataTypes) => {
    return sequelize.define('comentario_evento', {
        id_comentario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID del comentario'
        },
        texto_comentario: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Texto del comentario'
        },
        fecha_comentario: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Fecha del comentario'
        },
        eventos_fk: {
            type: DataTypes.INTEGER,
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
