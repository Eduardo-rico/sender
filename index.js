const express = require('express');
const conectarDB = require('./config/db');

//crear servidor
const app = express();

//conectarese a la db
conectarDB();

//const puerto del app
const port = process.env.PORT || 4000;

//habilitar leer los valores del body
app.use(express.json());

//rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

//iniciar la app
app.listen(port, '0.0.0.0', () => {
  console.log(`el servidor está en el puerto ${port}`);
});
