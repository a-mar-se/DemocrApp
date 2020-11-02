// import { response } from 'express';
// import { response } from 'express';
// import { response } from 'express';
import mongoose from 'mongoose';
import { Content } from './polls.js';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const User = mongoose.model('User', userSchema);

export const createUserResource = async (data) => {
  try {
    const isThereData = await User.find({ name: data.name });
    // console.log(isThereData);
    if (isThereData !== []) return await User.create({ ...data });
    else {
      return 'Username already in use';
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePerson = async (id, newData) => {
  try {
    console.log(id);

    await User.findByIdAndUpdate(id, { ...newData });
    const updatedUser = await User.findById(id);
    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const sendDeletePetition = async (id) => {
  try {
    const returnVal = await User.findByIdAndDelete(id);
    if (returnVal) {
      return 'user deleted';
    } else {
      return 'user doesn´t exist';
    }
  } catch (error) {
    throw new Error(error);
    // return 'kifj';
  }
};

export const sendDeletePetitionAll = async (id) => {
  try {
    const returnValUsers = await User.remove();
    const returnValPolls = await Content.remove();
    if (returnValUsers) {
      if (returnValPolls) {
        return 'users and polls deleted';
      } else {
        return 'Users deleted. Polls not deleted';
      }
    } else {
      return 'Can´t find users';
    }
  } catch (error) {
    throw new Error(error);
    // return 'kifj';
  }
};

export const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getElementsByKeyword = async (keyword) => {
  try {
    // const funf = async (keywordd) => {
    //   const users = await User.find({ name: keywordd });

    //   // const emails = await User.find({ email: keyword });

    //   // console.log([...users, ...emails]);
    //   // return [...users, ...emails];
    //   return users;
    // };
    return await User.find({ name: { $regex: `.*${keyword}.*` } });
    // const results = await User.find({ name: keywordd });
    // console.log(results);
    // return results;
  } catch (error) {
    throw new Error(error);
  }
};
