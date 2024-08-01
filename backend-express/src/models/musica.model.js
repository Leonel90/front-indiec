const musica = (sequelize, type) => {
    return sequelize.define('musica', {
        id_Musica: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de musica'
        },
        foto_musica: {
            type: type.STRING,
            comment: 'Foto del musica'
        },
        nombre_cancion: {
            type: type.STRING,
            comment: 'Nombre del musica'
        },
        nombre_Artista: {
            type: type.ENUM,
            values: [' A', ' B', ' C'],
            comment: 'Nombre del musica'
        },
        nombre_Album: {
            type: type.ENUM,
            values: ['Grupo A', 'Grupo B', 'Grupo C'],
            comment: 'Nombre del musica'
        },
        estado: {
            type: type.TINYINT,
            comment: 'Estado del musica'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de musica'
    });
};

module.exports = musica;
