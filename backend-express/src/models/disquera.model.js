const disquera = (sequelize, DataTypes) => {
    return sequelize.define('disqueras', {
        id_Disquera: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de disquera'
        },
        Foto_disquera: {
            type: DataTypes.STRING,
            comment: 'Foto del disquera'
        },
        Nombre_disquera: {
            type: DataTypes.STRING,
            comment: 'Nombre del disquera'
        },
        Descripcion_disquera: {
            type: DataTypes.STRING,
            comment: 'Descripción del disquera'
        },
       
        Url: {
            type: DataTypes.STRING,
            comment: 'URL del disquera'
        },
        estado_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'estado_manager',  
                key: 'id_estado_manager' 
            },
            comment: 'Clave foránea que referencia a EstadoManager'
        },
        plataforma_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'plataforma',  
                key: 'id_plataforma'   
            },
            comment: 'Clave foránea que referencia a plataformas'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de disquera'
    });
};

module.exports = disquera;
