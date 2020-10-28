import jwt from 'jsonwebtoken';
import logger from '../lib/logger.js';

const authorize = (req, res, next) => {
  try {
    const token = req.headers.token;
    // console.log(token);
    if (token) {
      // res.send(token);
      next();
    }
    // logger.info(req.headers.token);
    // return token;
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};

export default authorize;
