const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { promisify } = require('util');

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { user, pass } = req.body;

        // Verificar que todos los campos estén completos
        if (!user || !pass) {
            return res.render('register', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Por favor, complete todos los campos",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findByUsername(user);
        if (existingUser) {
            return res.render('register', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "El usuario ya existe",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(pass, 10);

        // Crear el nuevo usuario con la contraseña encriptada
        await User.create({ user, pass: hashedPassword });

        res.render('register', {
            alert: true,
            alertTitle: "Registro exitoso",
            alertMessage: "¡Te has registrado correctamente!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'login'
        });

    } catch (error) {
        console.log(error);
        res.render('register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Hubo un error en el registro",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'register'
        });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    try {
        const { user, pass } = req.body;

        // Verificar que todos los campos estén completos
        if (!user || !pass) {
            return res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }

        // Verificar si el usuario existe
        const existingUser = await User.findByUsername(user);
        if (!existingUser) {
            return res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o Password incorrectas",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(pass, existingUser.pass);
        if (!isMatch) {
            return res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o Password incorrectas",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }

        // Inicio de sesión correcto
        const id = existingUser.id;
        const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA
        });

        const cookiesOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.cookie('jwt', token, cookiesOptions);

        // Redirigir al index después del inicio de sesión exitoso
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor");
    }
};

// Autenticación
exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
            const user = await User.findByUsername(decoded.id);
            if (!user) return next();
            req.user = user;
            return next();
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        res.redirect('/login');
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.render('login', {
        alert: true,
        alertTitle: "Logout exitoso",
        alertMessage: "Has cerrado sesión correctamente",
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 1500,
        ruta: 'login'
    });
};
