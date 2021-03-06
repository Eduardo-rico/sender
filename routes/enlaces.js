const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const enlacesController = require('../controllers/enlacesController');
const auth = require('../middleware/auth');

router.post(
  '/',
  [
    check('nombre', 'sube un archivo').not().isEmpty(),
    check('nombre_original', 'sube un archivo').not().isEmpty()
  ],
  auth,
  enlacesController.nuevoEnlace
);

module.exports = router;
