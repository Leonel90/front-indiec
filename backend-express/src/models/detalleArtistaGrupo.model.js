const detalleArtistaGrupo = (sequelize, DataTypes) => {
    return sequelize.define('detalle_artista_grupo', {
        id_detalle_grupo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Identificador único para cada detalle del artista y grupo'
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
        grupo_musicals_fk: {
            type: DataTypes.INTEGER,
            references: {
                model: 'grupo_musicals', 
                key: 'id_GrupoMusical' 
            },
            comment: 'Clave foránea al grupo musical'
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
        comment: 'Tabla de detalle_artista_grupo'
    });
};

module.exports = detalleArtistaGrupo;
