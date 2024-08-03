const maneger = (sequelize, type) => {
    return sequelize.define('manegers', {
        id_Manager: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de maneger'
        },

        Foto_manager: {
            type: type.STRING,
            comment: 'Foto del artista'
        },
        Apellidos: {
            type: type.STRING,
            comment: 'Foto del artista'
        },
        Nombres: {
            type: type.STRING,
            comment: 'Apellido del usuario'
        }
        ,
        Email: {
            type: type.STRING,
            comment: 'Nombvre de usuario'
        }
        ,
        Genero: {
            type: type.ENUM,
            values: ['masculino', ' femenino', ' otros'],
            comment: 'los generos del manager'
        }
        , 
        Estado: {
            type: type.TINYINT(1),
            comment: 'estado del manager'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de maneger'
    });
};

module.exports = maneger;
