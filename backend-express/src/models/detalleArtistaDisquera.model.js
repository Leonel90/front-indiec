const detalleArtistaDisquera = (sequelize, type) => {
    return sequelize.define('detalle_artista_disqueras', {
        id_detalle_disquera: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de detalle artista disquera'
        },
        artista_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'artistas', 
                key: 'id_Artista'
            },
            comment: 'Clave foránea del artista'
        },
        disquera_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'disqueras', 
                key: 'id_Disquera'
            },
            comment: 'Clave foránea de la disquera'
        },
        generos_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'generos', 
                key: 'id_Album'
            },
            comment: 'Clave foránea del género'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de rompimiento entre artistas, disqueras y generos'
    });
};

module.exports = detalleArtistaDisquera;
