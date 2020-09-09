const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const nuevoEnlace = async (req, res, next) => {
  //revisar si hay errores
  const errores = validationResult(req); //en un arreglo
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //crear un objeto de enlace

  const { nombre_original } = req.body;
  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;

  //si el usuario está autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;
    //asignar a enlace el numero de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }
    //asignar el autor
    enlace.autor = req.usuario._id;
  }
  //almacenar en db
  try {
    await enlace.save();
    res.json({ mensaje: `${enlace.url}` });
    return next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  nuevoEnlace
};
