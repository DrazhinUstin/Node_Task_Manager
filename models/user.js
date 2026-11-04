const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, maxLength: 200 },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true, trim: true, minLength: 5, maxLength: 200 },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method('signJWT', function () {
  return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
});

const User = mongoose.model('User', userSchema);

module.exports = { userSchema, User };
