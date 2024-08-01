const grupoMusical = (sequelize, type) => {
    return sequelize.define('grupo_musical', {
        id_GrupoMusical: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de grupo musical omar '
        },
        foto_grupo: {
            type: type.STRING,
            comment: 'Foto del grupo musical'
        },
        nombre_grupo: {
            type: type.STRING,
            comment: 'Nombre del grupo musical'
        },
        descripcion: {
            type: type.STRING,
            comment: 'Descripción del grupo musical'
        },
        plataforma: {
            type: type.STRING,
            comment: 'Plataforma del grupo musical'
        },
        url: {
            type: type.STRING,
            comment: 'URL del grupo musical'
        },
        estado: {
            type: type.TINYINT,
            comment: 'Estado del grupo musical'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de grupos musicales'
    });
};

module.exports = grupoMusical;
