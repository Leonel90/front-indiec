const { DataTypes } = require('sequelize');

const album = (sequelize) => {
    return sequelize.define('album', {
        id_Album: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de album'
        },
        foto_album: {
            type: DataTypes.STRING,
            comment: 'Foto del album'
        },
        nombre_album: {
            type: DataTypes.STRING,
            comment: 'Nombre del album'
        },
        grupo_musicals_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'grupo_musicals', 
                key: 'id_GrupoMusical' 
            },
            comment: 'Clave foránea al grupo musical'
        },
        integrantes: {
            type: DataTypes.STRING,
            comment: 'Número de integrantes'
        },
        url: {
            type: DataTypes.STRING,
            comment: 'URL del album'
        },
        estado_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'estado_manager',  
                key: 'id_estado_manager'  
            },
            comment: 'Clave foránea que referencia a EstadoManager'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de album'
    });
};

module.exports = album;
