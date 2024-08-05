const musica = (sequelize, DataTypes) => {
    return sequelize.define('musica', {
        id_Musica: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de música'
        },
        foto_musica: {
            type: DataTypes.STRING,
            comment: 'Foto de la música'
        },
        nombre_musica: {
            type: DataTypes.STRING,
            comment: 'Nombre de la música'
        },
        nombre_Artista: {
            type: DataTypes.STRING,
            comment: 'Nombre del artista'
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
        estado_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'estado_manager',  
                key: 'id_estado_manager'  
            },
            comment: 'Clave foránea que  referencia a EstadoManager'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de música'
    });
};

module.exports = musica;
