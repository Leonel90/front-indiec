const evento = (sequelize, type) => {
    return sequelize.define('eventos', {
        id_Album: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de eventos'
        },
        Foto_evento: {
            type: type.STRING,
            comment: 'Foto del eventos'
        },

        Nombre_evento: {
            type: type.STRING,
            comment: 'nonbre del eventos'
        },
        Discripcion: {
            type: type.STRING,
            comment: 'Descripcion eventos'
        },
        Ubicacion: {
            type: type.STRING,
            comment: 'ubicacion eventos'
        },
        Fecha: {
            type: type.STRING,
            comment: 'Foto del eventos'
        },
        Contacto: {
            type: type.STRING,
            comment: 'telf evento'
        },
        Capacidad: {
            type: type.STRING,
            comment: 'capacidad del evento'
        },
        Artistas: {
            type: type.STRING,
            comment: 'nombres de los artistas'
        },

        estado: {
            type: type.TINYINT,
            comment: 'Estado del eventos'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de album'
    });
};

module.exports = evento;
