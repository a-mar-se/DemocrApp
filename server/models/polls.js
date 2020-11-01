// import { response } from 'express';
import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    favor: { type: Array },
    against: { type: Array },
    nfavor: { type: Number },
    nagainst: { type: Number },
    comments: { type: Array },
    title: { type: String },
    authorId: { type: String, required: true },
    typeContent: { type: String, required: true },
    parentId: { type: String },
  },
  {
    timestamps: true,
  },
);
export const Content = mongoose.model('Content', PollSchema);

export const createPollResource = async (data) => {
  console.log(data);
  try {
    return await Content.create({
      ...data,
      nfavor: 0,
      nagainst: 0,
      typeContent: 'poll',
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const createCommentResource = async (data) => {
  try {
    console.log(data);
    const psps = await Content.create({
      ...data,
      nfavor: 0,
      nagainst: 0,
      typeContent: 'comment',
    });
    console.log(psps);
  } catch (error) {
    // console.log('jsssssssssjajaja');
    throw new Error(error);
  }
};
export const getAll = async () => {
  try {
    return await Content.find();
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllPolls = async () => {
  try {
    return await Content.find({ typeContent: 'poll' });
  } catch (error) {
    throw new Error(error);
  }
};
export const getComments = async (id) => {
  try {
    return await Content.find({ typeContent: 'comment', parentId: id });
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePoll = async (id, newData) => {
  try {
    console.log(id);

    await Content.findByIdAndUpdate(id, { ...newData });
    const updatedPoll = await Content.findById(id);
    console.log(updatedPoll);
    return updatedPoll;
  } catch (error) {
    throw new Error(error);
  }
};

export const sendDeletePetitionPoll = async (id) => {
  try {
    const returnVal = await Content.findByIdAndDelete(id);
    if (returnVal) {
      return 'Poll deleted';
    } else {
      return 'Poll doesn´t exist';
    }
  } catch (error) {
    return { message: 'Cannot delete resource' };
    // return 'kifj';
  }
};

export const getPollById = async (id) => {
  try {
    return await Content.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};
export const getRandomPoll = async () => {
  try {
    const all = await Content.find({ typeContent: 'poll' });
    const N = all.length;
    console.log(N);
    const randomPoll = Math.floor(Math.random() * N);
    const polli = await Content.find({ typeContent: 'poll' })
      .limit(1)
      .skip(randomPoll);
    return polli[0];
  } catch (error) {
    throw new Error(error);
  }
};
