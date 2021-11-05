const { conf } = require('../config');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { genSalt, hash, compare } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength: 6,
      maxlength: 50,
      validate: {
        validator: isEmail,
        message: 'Email is not valid'
      }
    },
    password: {
      type: String,
      require: true
    }
  },
  { versionKey: false }
);

// middleware
const saltLength = Number(conf('security.password_salt_length'));
UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const salt = await genSalt(saltLength);
    this.password = await hash(this.password, salt);
  }
});

// methods
UserSchema.methods.checkPassword = async function(password) {
  return compare(password, this.password);
};

const jwtSecret = conf('security.jwt_secret');
UserSchema.methods.getAuthToken = function() {
  return sign({ access: 'auth', id: this._id }, jwtSecret);
};
UserSchema.statics.findByToken = async function(token) {
  const payload = verify(token, jwtSecret);
  if (payload.access !== 'auth') throw new Error('Payload access is not valid');
  return this.findById(payload.id);
};

const name = conf('collections.user');
exports.User = mongoose.model(name, UserSchema, name);
