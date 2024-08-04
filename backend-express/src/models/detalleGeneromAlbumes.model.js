const detalleGeneromAlbumes = (sequelize, DataTypes) => {
    return sequelize.define('detalle_generom_albumes', {
        id_generom_album: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Identificador único para cada detalle de género del álbum'
        },
        genero_musical_fk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'genero_musical_text',  // Nombre de la tabla en la base de datos
                key: 'id_genero'
            },
            comment: 'Clave foránea del género'
        },
        album_fk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'albums',  // Nombre de la tabla en la base de datos
                key: 'id_Album'
            },
            comment: 'Clave foránea al álbum'
        },
        calificacion_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'calificacion',  // Nombre de la tabla en la base de datos
                key: 'id_calificacion'
            },
            comment: 'Clave foránea al calificación'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de rompimiento entre géneros y álbumes'
    });
};

module.exports = detalleGeneromAlbumes;
