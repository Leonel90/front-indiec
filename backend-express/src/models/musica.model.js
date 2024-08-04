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
        nombre_Album: {
            type: DataTypes.ENUM,
            values: ['Grupo A', 'Grupo B', 'Grupo C'], // traer la fk album 
            comment: 'Nombre del álbum'
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
