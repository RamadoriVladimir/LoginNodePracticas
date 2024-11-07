const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

class User {
    constructor(user, pass) {
        this.user = user;
        this.pass = pass;
    }

    static async findByUsername(user) {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users WHERE user = ?', [user], (error, results) => {
                if (error) return reject(error);
                resolve(results.length > 0 ? results[0] : null);
            });
        });
    }

    static async create(user) {
        const passHash = await bcryptjs.hash(user.pass, 8);
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO users SET ?', { user: user.user, pass: passHash }, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static async comparePassword(plainPassword, hashedPassword) {
        return await bcryptjs.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;
