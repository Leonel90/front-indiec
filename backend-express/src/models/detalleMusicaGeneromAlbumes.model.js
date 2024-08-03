const detalleMusicaGeneromAlbumes = (sequelize, type) => {
    return sequelize.define('detalle_musica_generom_albumes', {
        Musica_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'musicas',
                key: 'id_Musica' 
            },
            comment: 'Clave foránea que referencia a la música'
        },
        detalle_generom_album_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'detalle_generom_albumes', 
                key: 'id_generom_album' 
            },
            comment: 'Clave foránea que referencia a los detalles del género del álbum'
        },
        calificacion_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'calificacion', 
                key: 'id_calificacion'
            },
            comment: 'Clave foránea que referencia a la calificación'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de rompimiento entre música, detalles del género del álbum y calificaciones'
    });
};

module.exports = detalleMusicaGeneromAlbumes;
