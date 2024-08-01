module.exports = (sequelize, DataTypes) => {
    const GeneroPersona = sequelize.define('GeneroPersona', {
        id_genero: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_genero: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'genero_persona',
        timestamps: false
    });

    return GeneroPersona;
};
