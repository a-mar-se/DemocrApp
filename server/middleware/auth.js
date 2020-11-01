import jwt from 'jsonwebtoken';
import { Content } from '../models/polls.js';
import { User } from '../models/user.js';

export const authorize = async (req, res, next) => {
  try {
    const email = await req.headers.email;
    const payload = await req.headers._id;
    const token = await req.headers.token;

    const secret = 'something really secret';
    const decoded = jwt.verify(token, secret, (err, payload) => {
      if (err) {
        console.log(token, payload);
      }
    });
    // const decoded = jwt.verify(token, 'Token');
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
    const id = await req.headers.id; // id of commment
    const token = await req.headers.token; // token of logged user

    const decoded = jwt.verify(token, 'Token'); // If the user is logged
    if (decoded.email === email) {
      const ussur = await Content.findById(id);
      // console.log(ussur);
      if (ussur.name == name) {
        // If the logged user is the same as the author of the comment
        next();
      }
    } else {
      return res.status(401).send(`Not authorized for this request!`);
    }
  } catch {
    return res.status(401).send(`Problem verifying token`);
  }
};

export const authorizeVote = async (req, res, next) => {
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

// export default authorize;
