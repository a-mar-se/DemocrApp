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
    return psps;
    // console.log(psps);
  } catch (error) {
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
    const res = await Content.find({ typeContent: 'poll' }).sort({ _id: -1 });
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const getComments = async (id) => {
  try {
    return await Content.find({ typeContent: 'comment', parentId: id }).sort({
      _id: -1,
    });
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
      const commentsOfPoll = await Content.remove({ parentId: id });
      if (commentsOfPoll) {
        console.log('Comments of the poll deleted');
      } else {
        console.log('There aren´t comments on this poll');
      }
      return 'Poll and comments deleted';
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

// export const tryLikePoll = async (id) => {
//   try {
//     console.log(id);
//     const poll = await Content.findById(id);
//     console.log(poll);
//     // await Content.findByIdAndUpdate(id, { ...newData });
//     // const updatedPoll = await Content.findById(id);
//     // console.log(updatedPoll);
//     // return updatedPoll;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const tryDislikePoll = async (id, userId) => {
  try {
    console.log(id);
    const poll = await Content.findById(id);
    console.log(poll);
    console.log(poll.against.includes(userId));
    if (poll.against.includes(userId)) {
      const position = poll.against.indexOf(userId);
      const newNagainst = poll.nagainst - 1;
      // const newNagainst = 0;
      const newAgainst = [
        ...poll.against.splice(0, position),
        ...poll.against.splice(position + 1),
      ];
      console.log(newAgainst);
      const updatedPoll = await Content.findByIdAndUpdate(id, {
        nagainst: newNagainst,
        against: newAgainst,
      });
      console.log('already disliked');
    } else {
      if (poll.favor.includes(userId)) {
        const position = poll.favor.indexOf(userId);
        const updatedPoll = await Content.findByIdAndUpdate(id, {
          favor: [
            ...poll.favor.splice(0, position),
            ...poll.favor.splice(position + 1),
          ],
          nfavor: poll.nfavor - 1,
        });
      }
      const newNagainst = poll.nagainst + 1;

      // const newNagainst = 0;
      const newagainst = [...poll.against, userId];
      console.log(newagainst);
      const updatedPoll = await Content.findByIdAndUpdate(id, {
        nagainst: newNagainst,
        against: newagainst,
      });
      console.log('not disliked');
    }
    return await Content.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const tryLikePoll = async (id, userId) => {
  try {
    console.log(id);
    const poll = await Content.findById(id);
    console.log(poll);
    console.log(poll.favor.includes(userId));
    if (poll.favor.includes(userId)) {
      const position = poll.favor.indexOf(userId);
      const newNfavor = poll.nfavor - 1;
      const newfavor = [
        ...poll.favor.splice(0, position),
        ...poll.favor.splice(position + 1),
      ];
      console.log(newfavor);
      const updatedPoll = await Content.findByIdAndUpdate(id, {
        nfavor: newNfavor,
        favor: newfavor,
      });
      console.log('already liked');
    } else {
      if (poll.against.includes(userId)) {
        const position = poll.against.indexOf(userId);
        const updatedPoll = await Content.findByIdAndUpdate(id, {
          against: [
            ...poll.against.splice(0, position),
            ...poll.against.splice(position + 1),
          ],
          nagainst: poll.nagainst - 1,
        });
      }
      const newNfavor = poll.nfavor + 1;
      const newfavor = [...poll.favor, userId];
      // const newfavor = [];
      console.log(newfavor);
      const updatedPoll = await Content.findByIdAndUpdate(id, {
        nfavor: newNfavor,
        favor: newfavor,
      });
      console.log('not liked');
    }
    return await Content.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};
