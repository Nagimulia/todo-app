const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const privateRoute = async (req, res, next) => {
  let authToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      authToken = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Не авторизован' });
    }
  }
  if (!authToken) {
    res.status(401).json({ message: 'Пожалуйста, добавьте токен' });
  }
};

module.exports = {
  privateRoute,
};
