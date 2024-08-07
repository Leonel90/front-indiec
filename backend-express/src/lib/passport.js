const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../Database/dataBase.orm'); // Ajusta la ruta a tu archivo ORM

const artistas = db.artista; // Asegúrate de que 'usuario' se esté importando correctamente
console.log(artistas);

passport.use(
    'local.signin',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'contrasena',
            passReqToCallback: true,
        },
        async (req, email, contrasena, done) => {
            try {
                const artista = await artistas.findOne({ where: { email } });
                if (!artista) {
                    return done(null, false, req.flash('message', 'El correo electrónico no existe.'));
                }

                const validPassword = await bcrypt.compare(contrasena, artista.contrasena);
                if (!validPassword) {
                    return done(null, false, req.flash('message', 'Contraseña incorrecta.'));
                }

                return done(null, artista, req.flash('success', `Bienvenido ${artista.nombre}`));
            } catch (error) {
                console.error('Error en la autenticación:', error);
                return done(error);
            }
        }
    )
);

passport.use(
    'local.signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'contrasena',
            passReqToCallback: true,
        },
        async (req, email, contrasena, done) => {
            try {
                const existingArtista = await artistas.findOne({ where: { email } });
                if (existingArtista) {
                    return done(null, false, req.flash('message', 'El correo electrónico ya está registrado.'));
                }

                const hashedPassword = await bcrypt.hash(contrasena, 10);
                const { nombre, apellido, email, foto_artista, celular, contrasena } = req.body;

                const nuevoArtista = await artistas.create({
                    nombre,
                    apellido,
                    email,
                    foto_artista,
                    celular,
                    contrasena: hashedPassword,

                });

                return done(null, nuevoArtista);
            } catch (error) {
                console.error('Error en el registro:', error);
                return done(error);
            }
        }
    )
);

passport.serializeUser((artista, done) => {
    done(null, artista.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const artista = await artistas.findByPk(id);
        if (!artista) {
            return done(new Error('Usuario no encontrado'));
        }
        done(null, artista);
    } catch (error) {
        console.error('Error en la deserialización:', error);
        done(error);
    }
});

module.exports = passport;
