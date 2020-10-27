import { getAllUsers, createUserResource } from '../models/user.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

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
    console.log(request.body.name);
    let user = await User.findOne({ name: request.body.name });
    if (!user) {
      return response.status(400).send('Incorrect email or password.');
    }
    if (request.body.password != user.password) {
      return response.status(400).send('Incorrect email or password.');
    }

    const tokenData = {
      name: request.body.name,
    };
    console.log(tokenData);
    const token = jwt.sign({ name: request.body.name }, 'secret token', {
      expiresIn: 60 * 60,
    });
    response.status(200).json({
      name: request.body.name,
      token,
    });
  } catch (error) {
    return response.status(500).send({
      message: `The database can´t be access. Error: ${error}`,
    });
  }
};
