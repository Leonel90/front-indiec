const artista = (sequelize, DataTypes) => {
    return sequelize.define('artistas', {
        id_Artista: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de artista'
        },
        photo_artista: {
            type: DataTypes.STRING,
            comment: 'Foto del artista'
        },
        apellido: {
            type: DataTypes.STRING,
            comment: 'Apellido del artista'
        },
        nombre: {
            type: DataTypes.STRING,
            comment: 'Nombre del artista'
        },
        email: {
            type: DataTypes.STRING,
            comment: 'Email del artista'
        },
        celular: {
            type: DataTypes.STRING,
            comment: 'Número de teléfono del artista'
        },
        contrasena: {
            type: DataTypes.STRING,
            comment: 'Contraseña del artista'
        },
        genero_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'genero_persona', 
                key: 'id_genero'             
            },
            comment: 'Clave foránea que referencia a genero_persona'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de artistas'
    });
}

module.exports = artista;
