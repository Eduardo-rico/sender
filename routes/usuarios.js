const express = require('express');
const router = express.Router();
//se pone antes del método y en el controlador
const { check } = require('express-validator');
//importando controller
const usuarioController = require('../controllers/usuarioController');

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check(
      'password',
      'El passwor debe de ser de al menos 6 caracteres'
    ).isLength({ min: 6 })
  ],
  usuarioController.nuevoUsuario
);

module.exports = router;
