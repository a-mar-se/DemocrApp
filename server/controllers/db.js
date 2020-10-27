import {
  createDataResource,
  getAllData,
  getDataById,
  updatePerson,
  sendDeletePetition,
} from '../models/db.js';
import { createUserResource } from '../models/user.js';
// import { useParams } from 'react-router-dom';
import pkg from 'react-router-dom';
const { useParams } = pkg;

export const listData = async (request, response, next) => {
  try {
    const data = await getAllData();
    return response.status(200).send(data);
  } catch (error) {
    return response.status(500).send({
      message: `The database can´t be access. Error: ${error}`,
    });
  }
};

export const listPerson = async (request, response, next) => {
  const {
    params: { id },
  } = request;
  const dataResource = await getDataById(id);
  if (dataResource) {
    return response.status(200).send(dataResource);
  } else {
    return response.status(404).send({
      message: 'Error: Profile not found.',
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

export const deletePerson = async (request, response, next) => {
  const {
    params: { id },
  } = request;
  const dataResource = await sendDeletePetition(id);
  if (dataResource) {
    return response.status(200).send(dataResource);
  } else {
    return response.status(404).send({
      message: 'Error: Profile not found.',
    });
  }
};

export const createData = async (request, response) => {
  const { body } = request;
  try {
    const newData = await createDataResource(body);
    return response.status(201).send(newData);
  } catch (error) {
    return response.status(500).send({
      message: `Error: not connection to database, ${error}.`,
    });
  }
};
