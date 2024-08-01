const artista = (sequelize, type) => {
    return sequelize.define('artistas', {
        id_Artista: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de artista'
        },
        photo_artista: {
            type: type.STRING,
            comment: 'Foto del artista'
        },
        Apellido: {
            type: type.STRING,
            comment: 'Apellido del usuario'
        }
        ,
        Nombre: {
            type: type.STRING,
            comment: 'Nombvre de usuario'
        }
        ,
        Email: {
            type: type.STRING,
            comment: 'email de usuario'
        }
        ,
        Celular: {
            type: type.STRING,
            comment: 'numero del artista'
        }
        ,
        Contraseña: {
            type: type.STRING,
            comment: 'contraseña del artista'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de artista'
    })
}

module.exports = artista