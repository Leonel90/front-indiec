const detalleUbicacion = (sequelize, DataTypes) => {
    return sequelize.define('detalle_ubicacion', {
        id_ubicacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Identificador único para cada ubicación'
        },
        nombre_ubicacion: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Nombre de la ubicación'
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Dirección de la ubicación'
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Ciudad de la ubicación'
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Estado de la ubicación'
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'País de la ubicación'
        },
        fecha_evento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: 'Fecha del evento en la ubicación'
        },
        hora_evento: {
            type: DataTypes.TIME,
            allowNull: true,
            comment: 'Hora del evento en la ubicación'
        }
    }, {
        timestamps: false,
        comment: 'Tabla que almacena detalles de la ubicación de eventos'
    });
};

module.exports = detalleUbicacion;
