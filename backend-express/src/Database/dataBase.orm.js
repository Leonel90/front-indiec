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
const genero = require("../models/genero.model");
const evento = require("../models/evento.model");
// david rompimiento




// alejandro  tablas unicas




//zincronia tablas aqui primero
const artista = artistaModel(sequelize, Sequelize);
const grupo_musical = grupoMusical (sequelize, Sequelize);
const albums = album(sequelize, Sequelize);
const musicas = musica(sequelize, Sequelize);
const managers = manager(sequelize, Sequelize);
const disqueras = disquera(sequelize, Sequelize);
const generos = genero(sequelize, Sequelize);
const eventos = evento(sequelize, Sequelize);
// david rompimiento




// alejandro  tablas unicas



//relaciones
sequelize.sync({ alter: true }) // alter will update the database schema to match the model
    .then(() => {
        console.log('Database sincronizada PAPUCHO');
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
    generos,
    eventos,

    // david rompimiento




// alejandro  tablas unicas

};