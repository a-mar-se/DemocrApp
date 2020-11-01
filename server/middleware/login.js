import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
//  { secret } = require('../config/environment');
function login(req, res, next) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user.password != req.body.password) {
      return res.status(401).json({ message: 'Wrong password' });
    } else {
      const secret = 'something really secret';
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '1h' });
      return res
        .status(200)
        .json({ user, token, message: `Welcome back ${user.name}` });
    }
  });
}

export default login;
