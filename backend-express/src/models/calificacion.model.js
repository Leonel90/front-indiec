module.exports = (sequelize, DataTypes) => {
    const Calificacion = sequelize.define('Calificacion', {
        id_calificacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'calificacion',
        timestamps: false
    });

    return Calificacion;
};

