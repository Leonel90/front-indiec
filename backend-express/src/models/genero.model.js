const genero = (sequelize, type) => {
    return sequelize.define('genero', {
        id_Album: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de genero'
        },
        nombre_album: {
            type: type.STRING,
            comment: 'Nombre del genero'
        }

    }, {
        timestamps: false,
        comment: 'Tabla de genero'
    });
};

module.exports = genero;
