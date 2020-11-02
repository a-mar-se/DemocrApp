import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//  { secret } = require('../config/environment');
function login(req, res, next) {
  try {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          const validation = async () => {
            async function comparation() {
              const hashedPass = await bcrypt.compare(
                req.body.password,
                user.password,
                // BCRYPT_SALT_ROUNDS,
              );
              return hashedPass;
            }
            const pass = async () => {
              const val = await comparation();
              return val;
            };
            const hassy = await pass();
            return {
              hassy,
              user,
            };
          };
          const values = validation();
          return values;
        } else {
          return res.status(401).json({ message: 'User now found' });
        }
      })
      .then(({ hassy, user }) => {
        console.log(hassy);
        if (hassy === false) {
          return res.status(401).json({ message: 'Wrong password' });
        } else {
          const secret = 'something really secret';
          const token = jwt.sign({ sub: user._id }, secret, {
            expiresIn: '1h',
          });
          return res
            .status(200)
            .json({ user, token, message: `Welcome back ${user.name}` });
        }
      });
  } catch (error) {
    return res.status(350).json({ message: 'user not found' });
  }
}

export default login;
