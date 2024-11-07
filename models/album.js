
const conexion = require('../database/db');

class Album {
    static async list() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM albums';
            conexion.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async add(album_name, artist_id) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO albums (album_name, artist_id) VALUES (?, ?)';
            conexion.query(query, [album_name, artist_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async findById(albumId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM albums WHERE id = ?';
            conexion.query(query, [albumId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static async update(albumId, album_name, artist_id) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE albums SET album_name = ?, artist_id = ? WHERE id = ?';
            conexion.query(query, [album_name, artist_id, albumId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(albumId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM albums WHERE id = ?';
            conexion.query(query, [albumId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Album;
