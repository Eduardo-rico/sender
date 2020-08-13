const express = require('express');

//crear servidor
const app = express();

//const puerto del app
const port = process.env.PORT || 4000;

//iniciar la app
app.listen(port, '0.0.0.0', () => {
  console.log(`el servidor está en el puerto ${port}`);
});
