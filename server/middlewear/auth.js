const jwt = require('jsonwebtoken');
require('dotenv').config();


const KEY = process.env.KEY;

const authenticateJWT = (req, res, next) => {
    const token = req.headers['token'];
  
    if (!token) {
      return res.status(401).json({ success: false, msg: 'Access Denied' });
    }
  
    jwt.verify(token, KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, msg: 'Forbidden' });
      }
      req.user = user; // Attach the user object to the request
      next();
    });
  };
  
  module.exports = authenticateJWT;
  
  


module.exports = authenticateJWT;
