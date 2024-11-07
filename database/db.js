const mysql = require('mysql');

// Crear la conexión
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

// Conectar a la base de datos
conexion.connect((error) => {
    if (error) {
        console.log('El error de conexión es: ' + error);
        return;
    }
    console.log('¡Conectado a la base de datos MySQL!');

    // Crear tabla de usuarios si no existe
    const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user VARCHAR(255) NOT NULL UNIQUE,
        pass VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    // Ejecutar la consulta para crear la tabla de usuarios
    conexion.query(createUsersTableSQL, (err) => {
        if (err) {
            console.error('Error al crear la tabla de usuarios: ' + err);
            return;
        }
        console.log("Tabla de usuarios creada o ya existente");

        // Crear tabla de álbumes si no existe
        const createAlbumsTableSQL = `
        CREATE TABLE IF NOT EXISTS albums (
            id INT AUTO_INCREMENT PRIMARY KEY,
            album_name VARCHAR(255) NOT NULL,
            user_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;

        // Ejecutar la consulta para crear la tabla de álbumes
        conexion.query(createAlbumsTableSQL, (err) => {
            if (err) {
                console.error('Error al crear la tabla de álbumes: ' + err);
                return;
            }
            console.log("Tabla de álbumes creada o ya existente");

            // Crear tabla de tracks si no existe
            const createTracksTableSQL = `
            CREATE TABLE IF NOT EXISTS tracks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                track_name VARCHAR(255) NOT NULL,
                album_id INT,
                duration TIME,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                image_path VARCHAR(255),
                audio_path VARCHAR(255),
                FOREIGN KEY (album_id) REFERENCES albums(id)
            )`;

            // Ejecutar la consulta para crear la tabla de tracks
            conexion.query(createTracksTableSQL, (err) => {
                if (err) {
                    console.error('Error al crear la tabla de tracks: ' + err);
                    return;
                }
                console.log("Tabla de tracks creada o ya existente");
            });
        });
    });
});

module.exports = conexion;
