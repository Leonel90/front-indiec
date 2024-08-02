const detalleArtistaManeger = (sequelize, type) => {
    return sequelize.define('detalle_artista_maneger', {
       artista_fk: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'artistas', 
                key: 'id_Artista'
            },
            comment: 'Clave foránea del artista'
        },
        maneger_fk: {
            type: type.INTEGER,
            references: {
                model: 'manegers', 
                key: 'id_Manager'
            },
            
            comment: 'Clave foránea que referencia al manager'
        }
    }, {
        timestamps: false,
        comment: 'Tabla que almacena detalles de la relación entre artistas y managers'
    });
};

module.exports = detalleArtistaManeger; 
