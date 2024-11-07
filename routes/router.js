const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const albumController = require('../controllers/albumController');
const trackController = require('../controllers/trackController');
const upload = require('../middleware/multerConfig');

// Ruta para index
router.get('/', (req, res) => {
    res.render('index'); 
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', authController.register);

// Ruta para la lista de álbumes
router.get('/albums', albumController.listAlbums);

// Ruta para agregar un nuevo álbum
router.get('/albums/new', (req, res) => {
    res.render('editAlbum', { album: {} }); 
});

router.post('/albums', albumController.addAlbum);

router.put('/albums/:id', albumController.updateAlbum);

// Rutas para los tracks
router.get('/tracks', trackController.listTracks); 
router.get('/tracks/new', trackController.addTrack); 
router.get('/tracks/:id/edit', trackController.editTrack); 
router.post('/tracks', trackController.saveTrack); 
router.put('/tracks/:id', trackController.updateTrack); 
router.delete('/tracks/:id', trackController.deleteTrack); 

module.exports = router;
