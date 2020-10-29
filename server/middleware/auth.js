import jwt from 'jsonwebtoken';
import logger from '../lib/logger.js';

const authorize = async (req, res, next) => {
  try {
    const email = await req.headers.email;
    const token = await req.headers.token;
    const decoded = jwt.verify(token, 'Token');
    console.log(decoded.email); // bar
    console.log(token);
    if (decoded.email === email) {
      // res.send(token);
      next();
    } else {
      return res.status(401).send(`Not authorized for this request!`);
    }
    // logger.info(req.headers.token);
    // return token;
  } catch {
    return res.status(461).send(`Problem verifying token`);
  }
};

export default authorize;
