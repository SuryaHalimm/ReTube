const express = require('express');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { hashPassword, comparePassword } =  require('../helpers/crypto');

async function create(name, email, password, re_password) {
  const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username: name,
      email,
      password: hashedPassword,
      re_password: hashedPassword
  });

  return newUser.save()
}

async function findByEmail(email) {
  return User.findOne({ email }).exec();
}

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email}).exec();
  if (!user) {
    return null;
  } 
  const passwordMatched = await comparePassword(password, user.password);
  if(!passwordMatched){
    res.redirect('login');
  }
  res.redirect('/');
}


async function findByName(name) {
  return User.findByName(name);
}

module.exports = {
  create,
  findByEmail,
  login,
  findByName
}