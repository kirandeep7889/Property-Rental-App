const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


const auth = (req, res, next) => {

  const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
