const detalleUbicacion = (sequelize, type) => {
    return sequelize.define('detalle_ubicacion', {
        id_ubicacion: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Identificador único para cada ubicación'
        },
        nombre_ubicacion: {
            type: type.STRING,
            allowNull: false,
            comment: 'Nombre de la ubicación'
        },
        direccion: {
            type: type.STRING,
            allowNull: false,
            comment: 'Dirección de la ubicación'
        },
        ciudad: {
            type: type.STRING,
            allowNull: false,
            comment: 'Ciudad de la ubicación'
        },
        estado: {
            type: type.STRING,
            allowNull: false,
            comment: 'Estado de la ubicación'
        },
        pais: {
            type: type.STRING,
            allowNull: false,
            comment: 'País de la ubicación'
        },
        fecha_evento: {
            type: type.DATEONLY,
            allowNull: true,
            comment: 'Fecha del evento en la ubicación'
        },
        hora_evento: {
            type: type.TIME,
            allowNull: true,
            comment: 'Hora del evento en la ubicación'
        }
    }, {
        timestamps: false,
        comment: 'Tabla que almacena detalles de la ubicación de eventos'
    });
};

module.exports = detalleUbicacion; 