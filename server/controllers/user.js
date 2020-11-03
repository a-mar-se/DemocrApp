import {
  getAllUsers,
  createUserResource,
  updatePerson,
} from '../models/user.js';
import jwt from 'jsonwebtoken';
import {
  User,
  sendDeletePetition,
  sendDeletePetitionAll,
  getUserById,
  getElementsByKeyword,
} from '../models/user.js';
import logger from '../lib/logger.js';

export const createNewUser = async (request, response) => {
  const { body } = request;
  try {
    const newData = await createUserResource(body);
    return response.status(201).send(newData);
  } catch (error) {
    return response.send({
      message: `Error: not connection to database, ${error}.`,
    });
  }
};

export const listAllUsers = async (request, response, next) => {
  try {
    const data = await getAllUsers();
    return response.status(200).send(data);
  } catch (error) {
    return response.status(500).send({
      message: `The database can´t be access. Error: ${error}`,
    });
  }
};

export const signIn = async (request, response, next) => {
  try {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(410).send('Incorrect email. ');
    }
    if (request.body.password != user.password) {
      return response.status(420).send('Incorrect email or password.');
    } else {
      const payload = { sub: user._id };
      const secret = 'something really secret';
      const options = { expiresIn: '1hr' };
      const token = jwt.sign(payload, secret, options);

      // const token = jwt.sign({ email: request.body.email }, 'Token', {
      //   expiresIn: 60 * 60,
      // });

      response.setHeader('Token', token);
      response.status(200).json({
        _id: user._id,
        email: user.email,
        token,
        name: user.name,
      });
      logger.info(response.Token);
      return response;
    }
  } catch (error) {
    return response.status(500).send({
      message: `The database can´t be access. Error: ${error}`,
    });
  }
};

export const editPerson = async (request, response, next) => {
  const {
    params: { id },
    body,
  } = request;
  const dataResource = await updatePerson(id, body);
  if (dataResource) {
    return response.status(200).send(dataResource);
  } else {
    return response.status(404).send({
      message: 'Error: Profile not found.',
    });
  }
};

export const editPerson2 = async (request, response, next) => {
  const {
    params: { id },
    body,
  } = request;
  const token = request.headers.token;
  logger.info(request.headers.token);

  try {
    const dataResource = await updatePerson(id, body);

    return response.status(200).send(dataResource);
  } catch (err) {
    return response
      .status(408)
      .send('Error: Profile not found or not logged in. Cannot be edited');
  }
};

export const deletePerson = async (request, response, next) => {
  const {
    params: { id },
  } = request;
  // logger.info(request.headers.token);

  try {
    // const token = await request.headers.token;
    // const data = jwt.verify(token, 'token');
    // logger.info(id);

    const dataResource = await sendDeletePetition(id);
    if (dataResource) {
      return await response.status(200).send(dataResource);
    } else {
      return await response.status(404).send({
        message: 'Error: Profile not found.',
      });
    }
  } catch (err) {
    return await response.send(err);
  }
};

export const listPerson = async (request, response, next) => {
  const {
    params: { id },
  } = request;
  const dataResource = await getUserById(id);
  if (dataResource) {
    return response.status(200).send(dataResource);
  } else {
    return response.status(404).send({
      message: 'Error: Profile not found.',
    });
  }
};

export const listUserData = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: 'Not logged in' });
  const token = req.headers.authorization.replace('Bearer ', '');
  new Promise((resolve, reject) => {
    const secret = 'something really secret';
    jwt.verify(token, secret, (err, payload) => {
      if (err)
        return res.status(420).json({ message: 'The user is not logged in' });
      return resolve(payload);
    });
  })
    .then((payload) => {
      return User.findById(payload.sub);
      // console.log(user);
    })
    // find the user by the user ID in the payload
    .then((user) => {
      if (!user) return res.status(402).json({ message: 'User doesn´t exist' });
      req.currentUser = user;
      return res.status(200).send(user);
    })
    .catch(next);
};

export const deleteAll = async (request, response, next) => {
  try {
    const dataResource = await sendDeletePetitionAll();
    if (dataResource) {
      return await response.status(200).send(dataResource);
    } else {
      return await response.status(404).send({
        message: 'Error: Profile not found.',
      });
    }
  } catch (err) {
    return await response.send(err);
  }
};

export const listElements = async (request, response, next) => {
  const dataResource = await getElementsByKeyword(request.body.keyword);
  console.log(dataResource);
  if (dataResource) {
    return response.status(200).send(dataResource);
  } else {
    return response.status(404).send({
      message: 'Error: No user found with that name.',
    });
  }
};
