const disquera = (sequelize, type) => {
    return sequelize.define('disqueras', {
        id_Disquera: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de disquera'
        },
        Foto_disquera: {
            type: type.STRING,
            comment: 'Foto del disquera'
        },
        Nombre_disquera: {
            type: type.STRING,
            comment: 'Nombre del disquera'
        },
        Descripcion_disquera: {
            type: type.STRING,
            comment: 'Descripcion del disquera'
        },
        Plataforma: {
            type: type.STRING,
            comment: 'Plataforma del disquera'
        },
        Url: {
            type: type.STRING,
            comment: 'URL del disquera'
        },
        Estado: {
            type: type.TINYINT,
            comment: 'Estado del disquera'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de disquera'
    });
};

module.exports = disquera;
