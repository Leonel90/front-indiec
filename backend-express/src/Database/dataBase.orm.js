const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI);
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 2,
            acquire: 30000,
            idle: 10000
        }
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((err) => {
        console.error("Error al sincronizar las tablas:", err.message);
    });

//extracionModelos
const artistaModel = require('../models/artista.model');
const grupoMusical = require("../models/grupoMusical.model");
const album = require("../models/album.model");
const musica = require("../models/musica.model");
const manager = require("../models/manager.model");
const disquera = require("../models/disquera.model");
const evento = require("../models/evento.model");
// david rompimiento
const detalleArtistaDisquera = require("../models/detalleArtistaDisquera.model");
const detalleArtistaGrupo = require("../models/detalleArtistaGrupo.model");
const detalleArtistaManeger = require("../models/detalleArtistaManeger.model");
const detalleMusicaGeneromAlbumes = require("../models/detalleMusicaGeneromAlbumes.model");
const detalleGeneromAlbumes = require("../models/detalleGeneromAlbumes.model");





// alejandro  tablas unicas
const plataformaModel = require('../models/plataforma.model');
const generoPersonaModel = require('../models/genero_persona.model');
const estadoManagerModel = require('../models/estado_manager.model');
const generoMusicalModel = require('../models/genero_musical.model');
const calificacionModel = require('../models/calificacion.model');



//zincronia tablas aqui primero
const artista = artistaModel(sequelize, Sequelize);
const grupo_musical = grupoMusical (sequelize, Sequelize);
const albums = album(sequelize, Sequelize);
const musicas = musica(sequelize, Sequelize);
const managers = manager(sequelize, Sequelize);
const disqueras = disquera(sequelize, Sequelize);
const eventos = evento(sequelize, Sequelize);
// david rompimiento

const detalle_artista_disquera = detalleArtistaDisquera(sequelize, Sequelize);
const detalle_artista_grupo = detalleArtistaGrupo(sequelize, Sequelize);
const detalle_artista_maneger = detalleArtistaManeger(sequelize, Sequelize);
const detalle_musica_generom_albumes = detalleMusicaGeneromAlbumes(sequelize, Sequelize);
const detalle_generom_albumes = detalleGeneromAlbumes(sequelize, Sequelize);



// alejandro  tablas unicas
const plataformas = plataformaModel(sequelize, Sequelize);
const generoPersonas = generoPersonaModel(sequelize, Sequelize);
const estadoManagers = estadoManagerModel(sequelize, Sequelize);
const generoMusicales = generoMusicalModel(sequelize, Sequelize);
const calificaciones = calificacionModel(sequelize, Sequelize);


// Datos precargados
const plataformaData = [
    { nombre_plataforma: 'Spotify' },
    { nombre_plataforma: 'Apple Music' },
    { nombre_plataforma: 'YouTube Music' }
];


const generoPersonaData = [
    { nombre_genero: 'Masculino' },
    { nombre_genero: 'Femenino' },
    { nombre_genero: 'No Binario' }
];


const estadoManagerData = [
    { estado: 'Activo' },
    { estado: 'Inactivo' }
];

const generoMusicalData = [
    { genero_musical_text: 'Rock' },
    { genero_musical_text: 'Pop' },
    { genero_musical_text: 'Jazz' }
];

const calificacionData = [
    { valor: 1 , descripcion: 'Muy Malo' },
    { valor: 2 , descripcion: 'Malo' },
    { valor: 3 , descripcion: 'Regular' },
    { valor: 4 , descripcion: 'Bueno' },
    { valor: 5 , descripcion: 'Muy Bueno' }
];

// Sincronizar la base de datos y cargar datos
sequelize.sync({ alter: true })
    .then(async () => {
        console.log('Database sincronizada PAPUCHO');
        
        // Insertar datos en tablas únicas
        await plataformas.bulkCreate(plataformaData);
        await generoPersonas.bulkCreate(generoPersonaData);
        await estadoManagers.bulkCreate(estadoManagerData);
        await generoMusicales.bulkCreate(generoMusicalData);
        await calificaciones.bulkCreate(calificacionData);
        
        console.log('Datos precargados insertados');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

// Exportar el objeto sequelize
module.exports = {
    artista, 
    grupo_musical,
    albums,
    musicas,
    managers,
    disqueras,
    eventos,

    // david rompimiento

    detalle_artista_disquera,
    detalle_artista_grupo,
    detalle_artista_maneger,
    detalle_musica_generom_albumes,
    detalle_generom_albumes,
   


    // alejandro  tablas unicas
    plataformas,
    generoPersonas,
    estadoManagers,
    generoMusicales,
    calificaciones
};