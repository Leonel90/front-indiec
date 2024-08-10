const passport = require('passport');
const sql = require('../Database/dataBase.sql');


const indexCtl = {};

// Generar y enviar el token CSRF
indexCtl.mostrar = async (req, res) => {
    try {
        res.json({ csrfToken: req.csrfToken() });
    } catch (error) {
        console.error('Error en la consulta SQL:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

// Mostrar formulario de registro si no hay usuarios, o redirigir si ya existen
indexCtl.mostrarRegistro = async (req, res) => {
    try {
        const [artista] = await sql.promise().query('SELECT COUNT(*) AS total FROM artistas');
        if (artista[0].total === 0) {
            const [rows] = await sql.promise().query('SELECT MAX(id) AS Maximo FROM artistas');
            res.json({ maxUserId: rows[0].Maximo, csrfToken: req.csrfToken() });
        } else {
            res.json({ redirect: '/' });
        }
    } catch (error) {   
        console.error('Error en la consulta SQL:', error.message);
        res.status(500).send('Error al realizar la consulta');
    }
};

// Registro de usuarios
indexCtl.registro = passport.authenticate('local.signup', {
    successRedirect: "/closeSection",
    failureRedirect: "/Register",
    failureFlash: true,
    failureMessage: true
})

// Inicio de sesión de usuarios
indexCtl.login = (req, res, next) => {
    passport.authenticate('local.signin', (err, artista, info) => {
        if (err) {
            return next(err);
        }
        if (!artista) {
            return res.status(400).json({ message: info ? info.message : 'Credenciales incorrectas' });
        }
        req.logIn(artista, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Inicio de sesión exitoso', redirect: '/dashboard'});
        });
    })(req, res, next);
};

// Cerrar sesión
indexCtl.CerrarSesion = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Sesión cerrada con éxito', redirect: '/login' });
    });
};

module.exports = indexCtl;