const detalleArtistaGrupo = (sequelize, type) => {
    return sequelize.define('detalle_artista_grupo', {
        id_detalle_grupo: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Identificador único para cada detalle del artista y grupo'
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
        grupo_musicals_fk: {
            type: type.INTEGER,
            references: {
                model: 'grupo_musicals', 
                key: 'id_GrupoMusical' 
            },
            comment: 'Clave foránea al  grupo_musicals'
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
        comment: 'Tabla de detalle_artista_grupo'
    });
};

module.exports = detalleArtistaGrupo;
