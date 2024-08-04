const grupoMusical = (sequelize, DataTypes) => {
    return sequelize.define('grupo_musical', {
        id_GrupoMusical: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de grupo musical'
        },
        foto_grupo: {
            type: DataTypes.STRING,
            comment: 'Foto del grupo musical'
        },
        nombre_grupo: {
            type: DataTypes.STRING,
            comment: 'Nombre del grupo musical'
        },
        descripcion: {
            type: DataTypes.STRING,
            comment: 'Descripción del grupo musical'
        },
        url: {
            type: DataTypes.STRING,
            comment: 'URL del grupo musical'
        },
        estado_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'estado_manager',  // Nombre de la tabla referenciada
                key: 'id_estado_manager'  // Clave primaria de la tabla referenciada
            },
            comment: 'Clave foránea que referencia a EstadoManager'
        },
        plataforma_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'plataforma',  // Nombre de la tabla referenciada
                key: 'id_plataforma'   // Clave primaria de la tabla referenciada
            },
            comment: 'Clave foránea que referencia a Plataforma'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de grupos musicales'
    });
};

module.exports = grupoMusical;
