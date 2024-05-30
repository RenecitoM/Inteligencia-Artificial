require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./db'); 
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Conectar a la base de datos
connectDB();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar datos de formularios
app.use(helmet()); // Agregar encabezados de seguridad
app.use(morgan('combined')); // Middleware de registro

// Configurar el motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Ruta a las vistas

// Rutas
app.use('/api', routes);

// Ruta para la vista del chat
app.get('/', (req, res) => {
  res.render('chatView', { prompt: '', reply: '' });
});

// Manejo de errores centralizado
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
