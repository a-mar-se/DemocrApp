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
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(400).send('Incorrect email or password.');
    }
    if (request.body.password != user.password) {
      return response.status(400).send('Incorrect email or password.');
    }

    // const tokenData = {
    //   email: request.body.email,
    // };
    // console.log(tokenData);
    const token = jwt.sign({ email: request.body.email }, 'secret_token', {
      expiresIn: 60 * 60,
    });
    return response.status(200).json({
      _id: user._id,
      email: request.body.email,
      token,
    });
  } catch (error) {
    return response.status(500).send({
      message: `The database can´t be access. Error: ${error}`,
    });
  }
};
