const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CustomError = require('../lib/custom-error');

async function register(req, res, next) {
  try {
    const user = await User.create(req.body);

    const token = user.signJWT();

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      throw new CustomError('Invalid credentials!', 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError('Invalid credentials!', 400);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new CustomError('Invalid credentials!', 400);
    }

    const token = user.signJWT();

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
