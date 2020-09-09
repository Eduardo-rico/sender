const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
//se pone antes del método en el router y en el controlador
// const { check } = require('express-validator');
const { validationResult } = require('express-validator');

exports.nuevoUsuario = async (req, res) => {
  //mostrar mensajes de error de express validator
  const errores = validationResult(req); //en un arreglo
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //verificar si el usuario ya estuvo registrado
  const { email, password } = req.body;

  let usuario = await Usuario.findOne({ email });
  if (usuario) {
    return res.status(400).json({ mensaje: 'usuario ya está registrado' });
  }

  usuario = await new Usuario(req.body);

  //hashear el password del usuario
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  try {
    usuario.save();
    res.json({ mensaje: 'usuario creado' });
  } catch (error) {
    console.log(error);
  }
};
