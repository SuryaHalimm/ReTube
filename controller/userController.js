require('dotenv').config();
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/crypto');
const { celebrate } = require('celebrate');
const jwt = require('jsonwebtoken');
const authValidator = require('../validator/auth');

const register = async (req, res) => {
  const { user_name, email, password, createdAt } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const newUser = new User({
      username: user_name,
      email: email,
      password: hashedPassword,
      createdAt,
    });
    console.log(newUser);
    res.redirect('/login');
    return newUser.save();
  } catch (err) {
    console.log(err.message);
  }
};

async function findByEmail(email) {
  return User.findOne({ email }).exec();
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.redirect('/login');
    }
    const passwordMatched = await comparePassword(password, user.password);
    if (!passwordMatched) {
      return res.redirect('/login');
    }

    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_KEY);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('/index');
  } catch (err) {
    console.log(err.message);
  }
};

async function findByName(name) {
  return User.findByName(name);
}

module.exports = {
  register,
  findByEmail,
  login,
  findByName,
};
