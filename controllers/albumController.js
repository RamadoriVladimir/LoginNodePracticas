const Album = require('../models/album');

// Obtener todos los álbumes
exports.listAlbums = async (req, res) => {
    try {
        const albums = await Album.list();
        res.render('albumList', { albums });
    } catch (err) {
        console.error('Error al obtener los álbumes:', err);
        return res.status(500).send('Error al obtener los álbumes');
    }
};

// Agregar un nuevo álbum
exports.addAlbum = async (req, res) => {
    const { album_name, artist_id } = req.body;
    try {
        await Album.add(album_name, artist_id);
        res.redirect('/albums');
    } catch (err) {
        console.error('Error al agregar el álbum:', err);
        return res.status(500).send('Error al agregar el álbum');
    }
};

// Editar un álbum
exports.editAlbum = async (req, res) => {
    const albumId = req.params.id;
    try {
        const album = await Album.findById(albumId);
        res.render('editAlbum', { album });
    } catch (err) {
        console.error('Error al obtener el álbum:', err);
        return res.status(500).send('Error al obtener el álbum');
    }
};

// Actualizar un álbum
exports.updateAlbum = async (req, res) => {
    const albumId = req.params.id;
    const { album_name, artist_id } = req.body;
    try {
        await Album.update(albumId, album_name, artist_id);
        res.redirect('/albums');
    } catch (err) {
        console.error('Error al actualizar el álbum:', err);
        return res.status(500).send('Error al actualizar el álbum');
    }
};

// Eliminar un álbum
exports.deleteAlbum = async (req, res) => {
    const albumId = req.params.id;
    try {
        await Album.delete(albumId);
        res.redirect('/albums');
    } catch (err) {
        console.error('Error al eliminar el álbum:', err);
        return res.status(500).send('Error al eliminar el álbum');
    }
};
