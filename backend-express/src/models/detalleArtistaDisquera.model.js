const detalleArtistaDisquera = (sequelize, DataTypes) => {
    return sequelize.define('detalle_artista_disqueras', {
        id_detalle_disquera: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de detalle artista disquera'
        },
        artista_fk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'artistas',
                key: 'id_Artista'
            },
            comment: 'Clave foránea del artista'
        },
        disquera_fk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'disqueras',
                key: 'id_Disquera'
            },
            comment: 'Clave foránea de la disquera'
        },
        genero_musical_fk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'genero_musical_text',  // Nombre de la tabla en la base de datos
                key: 'id_genero'
            },
            comment: 'Clave foránea del género'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de rompimiento entre artistas, disqueras y géneros'
    });
};

module.exports = detalleArtistaDisquera;
