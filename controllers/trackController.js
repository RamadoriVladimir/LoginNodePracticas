const Track = require('../models/track');
const Album = require('../models/album');
const upload = require('../middleware/multerConfig');

// Obtener todos los tracks
exports.listTracks = async (req, res) => {
    try {
        const tracks = await Track.list();
        res.render('trackList', { tracks });
    } catch (err) {
        console.error('Error al obtener los tracks:', err);
        res.status(500).send('Error al obtener los tracks');
    }
};

// Agregar un nuevo track
exports.addTrack = async (req, res) => {
    try {
        const albums = await Album.list(); 
        res.render('editTrack', { track: {}, albums }); 
    } catch (err) {
        console.error('Error al obtener los álbumes:', err);
        res.status(500).send('Error al obtener los álbumes');
    }
};

// Editar un track
exports.editTrack = async (req, res) => {
    const trackId = req.params.id;
    try {
        const track = await Track.getById(trackId);
        if (!track) {
            return res.redirect('/tracks');
        }
        
        const albums = await Album.list();
        res.render('editTrack', { track, albums });
    } catch (err) {
        console.error('Error al obtener el track:', err);
        res.status(500).send('Error al obtener el track');
    }
};

// Actualizar un track
exports.updateTrack = async (req, res) => {
    const trackId = req.params.id;
    const { track_name, album_id, duration } = req.body;
    const image_path = req.file ? req.file.path : null; 
    const audio_path = req.files ? req.files.audio[0].path : null; 

    try {
        await Track.update(trackId, track_name, album_id, duration, image_path, audio_path);
        res.redirect('/tracks');
    } catch (err) {
        console.error('Error al actualizar el track:', err);
        res.status(500).send('Error al actualizar el track');
    }
};

// Eliminar un track
exports.deleteTrack = async (req, res) => {
    const trackId = req.params.id;
    try {
        await Track.delete(trackId);
        res.redirect('/tracks');
    } catch (err) {
        console.error('Error al eliminar el track:', err);
        res.status(500).send('Error al eliminar el track');
    }
};

// Guardar un track
exports.saveTrack = async (req, res) => {
    try {
        const { track_name, album_id, duration } = req.body;
        const image_path = req.file ? req.file.path : null; 
        const audio_path = req.files ? req.files.audio[0].path : null; // Suponiendo que estás cargando múltiples archivos de audio

        // Verificar que todos los campos necesarios estén presentes
        if (!track_name || !album_id || !duration || !image_path || !audio_path) {
            return res.status(400).json({ error: 'Todos los campos son necesarios' });
        }

        await Track.add(track_name, album_id, duration, image_path, audio_path); // Aquí se llama el método add modificado

        res.redirect('/tracks');
    } catch (error) {
        console.error('Error del servidor:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};