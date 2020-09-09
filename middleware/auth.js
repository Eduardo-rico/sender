const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization'); //en lugar de sacarlo del header
  if (authHeader) {
    //obtener el token
    const token = authHeader.split(' ')[1];
    //comprobar el jwt
    try {
      const usuario = jwt.verify(token, process.env.SECRETA);
      // res.json({ usuario });
      req.usuario = usuario;
    } catch (error) {
      console.log(error);
    }
  }
  //no hay header
  return next();
};
