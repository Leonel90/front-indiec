module.exports = (sequelize, DataTypes) => {
    const GeneroMusical = sequelize.define('GeneroMusical', {
        id_genero: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        genero_musical_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'genero_musical_text',
        timestamps: false
    });

    return GeneroMusical;
};
