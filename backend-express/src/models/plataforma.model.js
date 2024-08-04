module.exports = (sequelize, DataTypes) => {
    const Plataforma = sequelize.define('Plataforma', {
        id_plataforma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          
        },
        nombre_plataforma: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'plataforma',
        timestamps: false
    });

    return Plataforma;
};
