const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Filtrar solo archivos de audio y fotos
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp3|wav/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb('Error: Archivo debe ser una imagen o un audio');
};

// Crear el middleware de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // Limitar tamaño a 100 MB
});

module.exports = upload;
