import {
  getAllUsers,
  createUserResource,
  updatePerson,
} from '../models/user.js';
import jwt from 'jsonwebtoken';
import { User, sendDeletePetition, getUserById } from '../models/user.js';
import logger from '../lib/logger.js';

export const createNewUser = async (request, response) => {
  const { body } = request;
  try {
    const newData = await createUserResource(body);
    return response.status(201).send(newData);
  } catch (error) {
    return response.status(500).send({
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
      return response.status(400).send('Incorrect email or password.');
    }
    if (request.body.password != user.password) {
      return response.status(400).send('Incorrect email or password.');
    }
    const token = jwt.sign({ email: request.body.email }, 'Token', {
      expiresIn: 60 * 60,
    });
    // response.setHeader('authorization');
    // return response.status(200).send(token);

    response.setHeader('Token', token);
    response.status(200).json({
      _id: user._id,
      email: user.email,
      token,
    });
    logger.info(response.Token);
    return response;
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
    const data = jwt.verify(token, 'token');
    logger.info(data);

    const dataResource = await updatePerson(id, body);
    if (dataResource) {
      return response.status(200).send(dataResource);
    } else {
      return response.status(404).send({
        message: 'Error: Profile not found or not logged in.',
      });
    }
  } catch (err) {
    return response.send('error');
  }
};

export const deletePerson = async (request, response, next) => {
  const {
    params: { id },
  } = request;
  const token = request.headers.token;
  logger.info(request.headers.token);

  try {
    const data = jwt.verify(token, 'token');
    logger.info(id);

    const dataResource = await sendDeletePetition(id);
    if (dataResource) {
      return response.status(200).send(dataResource);
    } else {
      return response.status(404).send({
        message: 'Error: Profile not found.',
      });
    }
  } catch (err) {
    return response.send('error');
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
