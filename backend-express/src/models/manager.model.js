const maneger = (sequelize, DataTypes) => {
    return sequelize.define('manegers', {
        id_Manager: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de manager'
        },
        Foto_manager: {
            type: DataTypes.STRING,
            comment: 'Foto del manager'
        },
        Apellidos: {
            type: DataTypes.STRING,
            comment: 'Apellidos del manager'
        },
        Nombres: {
            type: DataTypes.STRING,
            comment: 'Nombres del manager'
        },
        Email: {
            type: DataTypes.STRING,
            comment: 'Email del manager'
        },
        
        genero_fk: {    
            type: DataTypes.INTEGER,
            references: {
                model: 'genero_persona', 
                key: 'id_genero'          
            },
            comment: 'Clave foránea que referencia a GeneroPersona'
        },
        estado_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'estado_manager',  
                key: 'id_estado_manager'  
            },
            comment: 'Clave foránea que referencia a EstadoManager'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de managers'
    });
};

module.exports = maneger;
