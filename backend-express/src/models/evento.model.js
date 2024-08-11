const evento = (sequelize, DataTypes) => {
    return sequelize.define('eventos', {
        id_Evento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de eventos'
        },
        Foto_evento: {
            type: DataTypes.STRING,
            comment: 'Foto del evento'
        },
        Nombre_evento: {
            type: DataTypes.STRING,
            comment: 'Nombre del evento'
        },
        Descripcion: {
            type: DataTypes.STRING,
            comment: 'Descripción del evento'
        },
        Ubicacion: {
            type: DataTypes.STRING,
            comment: 'Ubicación del evento'
        },
        Fecha: {
            type: DataTypes.DATE,
            comment: 'Fecha del evento'
        },
        Contacto: {
            type: DataTypes.STRING,
            comment: 'Teléfono del evento'
        },
        Capacidad: {
            type: DataTypes.STRING,
            comment: 'Capacidad del evento'
        },
        Artistas: {
            type: DataTypes.STRING,
            comment: 'Nombres de los artistas'
        },

           estado_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'estado_manager',  
                key: 'id_estado_manager'  
            },
            comment: 'Clave foránea que referencia a EstadoManager'
        },
       
    }, {
        timestamps: false,  
        comment: 'Tabla de eventos'
    });
};

module.exports = evento;
