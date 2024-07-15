const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Artista = require('./models/Artista');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

sequelize.sync().then(() => console.log('Database connected'));

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secret', (err, artista) => {
    if (err) return res.sendStatus(403);
    req.artista = artista;
    next();
  });
};

app.post('/register', async (req, res) => {
  const { foto_perfil, nombre, apellido, correo, celular1, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  try {
    const artista = await Artista.create({ foto_perfil, nombre, apellido, correo, celular1, password: hashedPassword });
    res.status(201).json(artista);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { correo, password } = req.body; 
  const artista = await Artista.findOne({ where: { correo } }); 
  if (!artista) return res.status(404).json({ error: 'Artista no encontrado' });
  
  const isMatch = await bcrypt.compare(password, artista.password);
  if (!isMatch) return res.status(400).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: artista.id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// Ejemplo de una ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Esta es una ruta protegida', artista: req.artista });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));