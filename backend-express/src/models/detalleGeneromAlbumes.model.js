const detalleGeneromAlbumes = (sequelize, type) => {
    return sequelize.define('detalle_generom_albumes', {
        id_generom_album: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Identificador único para cada detalle de género del álbum'
        },
      generos_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'generos', 
                key: 'id_Album'
            },
            comment: 'Clave foránea del género'
        },
        album_fk: {
            type: type.INTEGER,
            allowNull:false,
            references: {
                model: 'albums', 
                key: 'id_Album' 
            },
            comment: 'Clave foránea al álbum'
        },
        calificacion_fk: {
            type: type.INTEGER,
               references: {
                model: 'calificacion', 
                key: 'id_calificacion' 
            },
            comment: 'Clave foránea al calificacion'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de rompimiento entre géneros y álbumes'
    });
};

module.exports = detalleGeneromAlbumes; 
