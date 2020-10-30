import jwt from 'jsonwebtoken';
import { Poll } from '../models/polls.js';

export const authorize = async (req, res, next) => {
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

export const authorizePoll = async (req, res, next) => {
  try {
    const email = await req.headers.email; // Email of logged user
    const name = await req.body.name; // author of commment
    const id = await req.body.id; // id of commment
    const token = await req.headers.token; // token of logged user
    const decoded = jwt.verify(token, 'Token');
    const ussur = await Poll.findById(id);
    if (decoded.email === email) {
      if (ussur.name == name) {
        next();
      }
    } else {
      return res.status(401).send(`Not authorized for this request!`);
    }
  } catch {
    return res.status(401).send(`Problem verifying token`);
  }
};

// export default authorize;
