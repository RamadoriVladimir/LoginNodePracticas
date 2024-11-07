const conexion = require('../database/db');

class Track {
    // Método para listar todos los tracks
    static async list() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM tracks';
            conexion.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Método para agregar un track
    static async add(track_name, album_id, duration, image_path, audio_path) {
        if (!track_name || !album_id || !duration) {
            throw new Error('El nombre del track, el ID del álbum y la duración son obligatorios');
        }

        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO tracks (track_name, album_id, duration, image_path, audio_path) VALUES (?, ?, ?, ?, ?)';
            conexion.query(query, [track_name, album_id, duration, image_path, audio_path], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Método para obtener un track por ID
    static async getById(trackId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM tracks WHERE id = ?';
            conexion.query(query, [trackId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    // Método para actualizar un track
    static async update(trackId, track_name, album_id, duration, image_path, audio_path) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE tracks SET track_name = ?, album_id = ?, duration = ?, image_path = ?, audio_path = ? WHERE id = ?';
            conexion.query(query, [track_name, album_id, duration, image_path, audio_path, trackId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Método para eliminar un track
    static async delete(trackId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM tracks WHERE id = ?';
            conexion.query(query, [trackId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Track;