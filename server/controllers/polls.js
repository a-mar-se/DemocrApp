import {
  getAllPolls,
  createPollResource,
  updatePoll,
  sendDeletePetitionPoll,
  getPollById,
  getRandomPoll,
} from '../models/polls.js';

import logger from '../lib/logger.js';

export const createNewPoll = async (request, response) => {
  const { body } = request;
  try {
    const newData = await createPollResource(body);
    return response.status(200).send(newData);
  } catch (error) {
    return response.status(500).send({
      message: `Error: not connection to database, ${error}.`,
    });
  }
};

export const listAllPolls = async (request, response, next) => {
  console.log('end');
  try {
    const data = await getAllPolls();
    return response.status(200).send(data);
  } catch (error) {
    return response.status(500).send({
      message: `The database can´t be access. Error: ${error}`,
    });
  }
};

export const editPoll = async (request, response, next) => {
  const {
    params: { id },
    body,
  } = request;
  // const token = request.headers.token;
  // logger.info(request.headers.token);

  try {
    const dataResource = await updatePoll(id, body);

    return response.status(200).send(dataResource);
  } catch (err) {
    return response
      .status(408)
      .send('Error: Profile not found or not logged in. Cannot be edited');
  }
};

export const deletePoll = async (request, response, next) => {
  const {
    params: { id },
  } = request;
  // logger.info(request.headers.token);

  try {
    // const token = await request.headers.token;
    // const data = jwt.verify(token, 'token');
    // logger.info(id);

    const dataResource = await sendDeletePetitionPoll(id);
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

export const listSinglePoll = async (request, response, next) => {
  const {
    params: { id },
  } = request;
  const dataResource = await getPollById(id);
  if (dataResource) {
    return response.status(200).send(dataResource);
  } else {
    return response.status(404).send({
      message: 'Error: Profile not found.',
    });
  }
};
export const listRandomPoll = async (request, response, next) => {
  const dataResource = await getRandomPoll();
  if (dataResource) {
    return response.status(200).send(dataResource);
  } else {
    return response.status(404).send({
      message: 'Error: Profile not found.',
    });
  }
};
