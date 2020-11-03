import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
// const { secret } = require('../config/environment');
import { User } from '../models/user.js';

function secureRoute(req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).json({ message: 'Unauthorized' });
  const token = req.headers.authorization.replace('Bearer ', '');
  new Promise((resolve, reject) => {
    const secret = 'something really secret';
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  })
    .then((payload) => User.findById(payload.sub)) // find the user by the user ID in the payload
    .then((user) => {
      if (!user) return res.status(401).json({ message: 'dd' });
      req.currentUser = user;
      next();
    })
    .catch(next);
}
export default secureRoute;
