const artista = (sequelize, DataTypes) => {
    return sequelize.define('artistas', {
        id_artista: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de artista'
        },
        foto_artista: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Foto del artista'
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Apellido del artista'
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Nombre del artista'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
            comment: 'Email del artista'
        },
        celular: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Número de teléfono del artista'
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Contraseña del artista'
        },
        
    }, {
        timestamps: false,
        tableName: 'artistas',
        comment: 'Tabla de artistas'
    });
}

module.exports = artista;