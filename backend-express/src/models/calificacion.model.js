module.exports = (sequelize, DataTypes) => {
    const Calificacion = sequelize.define('Calificacion', {
        id_calificacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        calificacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_calificacion: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'calificacion',
        timestamps: false
    });

    return Calificacion;
};
