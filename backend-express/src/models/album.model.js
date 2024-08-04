const album = (sequelize, type) => {
    return sequelize.define('album', {
        id_Album: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de album'
        },
        foto_album: {
            type: type.STRING,
            comment: 'Foto del album'
        },
        nombre_album: {
            type: type.STRING,
            comment: 'Nombre del album'
        },
        nombre_grupo: {
            type: type.ENUM,
            values: ['Grupo A', 'Grupo B', 'Grupo C'],//fk del grupo
            comment: 'Nombre del grupo'
        },
        integrantes: {
            type: type.STRING,
            comment: 'numeros integrantes'
        },
        url: {
            type: type.STRING,
            comment: 'URL del album'
        },
        estado: {
            type: type.TINYINT,
            comment: 'Estado del album' //fk del estado manager
        }
    }, {
        timestamps: false,
        comment: 'Tabla de album'
    });
};

module.exports = album;
