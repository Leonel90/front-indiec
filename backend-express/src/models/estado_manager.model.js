module.exports = (sequelize, DataTypes) => {
    const EstadoManager = sequelize.define('EstadoManager', {
        id_estado_manager: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'estado_manager',
        timestamps: false
    });

    return EstadoManager;
};
