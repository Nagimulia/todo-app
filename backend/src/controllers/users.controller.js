const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Пожалуйста проверьте обязательные поля' });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: 'Эл. адрес уже существует' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).json({
        __id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.id),
      });
    } else {
      res.status(400).json({ message: 'Неверные данные пользователя' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Неверные данные пользователя' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Пожалуйста проверьте обязательные поля' });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const doesPasswordMatch = await bcrypt.compare(password, user.password);
      if (doesPasswordMatch) {
        res.status(200).json({
          __id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user.id),
        });
      } else {
        res.status(400).json({ message: 'Пароль не совпадает' });
      }
    } else {
      res.status(400).json({ message: 'Электронная почта не существует' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Пожалуйста, проверьте обязательные поля' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
