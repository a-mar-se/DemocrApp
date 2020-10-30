// import { response } from 'express';
import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema(
  {
    name: String,
    content: { type: String, required: true, unique: true },
    favor: Array,
    against: Array,
  },
  {
    timestamps: true,
  },
);
export const Poll = mongoose.model('Poll', PollSchema);

export const createPollResource = async (data) => {
  try {
    console.log(data);
    return await Poll.create({ ...data });
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllPolls = async () => {
  try {
    return await Poll.find();
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePoll = async (id, newData) => {
  try {
    console.log(id);

    await Poll.findByIdAndUpdate(id, { ...newData });
    const updatedPoll = await Poll.findById(id);
    console.log(updatedPoll);
    return updatedPoll;
  } catch (error) {
    throw new Error(error);
  }
};

export const sendDeletePetitionPoll = async (id) => {
  try {
    const returnVal = await Poll.findByIdAndDelete(id);
    if (returnVal) {
      return 'Poll deleted';
    } else {
      return 'Poll doesn´t exist';
    }
  } catch (error) {
    throw new Error(error);
    // return 'kifj';
  }
};

export const getPollById = async (id) => {
  try {
    return await Poll.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};
