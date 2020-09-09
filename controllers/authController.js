const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

require('dotenv').config({ path: 'variables.env' });

exports.autenticarUsuario = async (req, res, next) => {
  //express-validator en routes
  const errores = validationResult(req); //en un arreglo
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //revisar si hay errores
  //buscar el usuario para ver si está registrado
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    res.status(401).json({ mensaje: 'El usuario no existe' });
    return next();
  }
  //verificar el passwor y autenticar usuario
  if (bcrypt.compareSync(password, usuario.password)) {
    //correcto
    //crear jwt
    const token = jwt.sign(
      {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      },
      process.env.SECRETA,
      {
        expiresIn: '8d'
      }
    );

    //enviar jwt

    res.json({ token });
  } else {
    //incorrecto
    res.status(401).json({ mensaje: 'password incorrecto' });
    return next();
  }
};

exports.usuarioAutenticado = async (req, res, next) => {
  //   const authHeader = req.get('Authorization'); //en lugar de sacarlo del header
  //   if (authHeader) {
  //     //obtener el token
  //     const token = authHeader.split(' ')[1];
  //     //comprobar el jwt
  //     try {
  //       const usuario = jwt.verify(token, process.env.SECRETA);
  //       res.json({ usuario });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   //no hay header
  //  return next();

  // console.log(req.usuario); //que viene desde el middleware auth
  res.json({ usuario: req.usuario });
};
