const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

// Cargar las variables de entorno
dotenv.config({ path: './env/.env' });

// Configuración de la vista
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/', require('./routes/router'));

// Middleware para controlar la caché si no hay usuario autenticado
app.use((req, res, next) => {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
    next();
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('SERVER UP running on http://localhost:3000');
});
