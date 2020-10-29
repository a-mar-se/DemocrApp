// import { response } from 'express';
import mongoose from 'mongoose';

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
    console.log(data);
    return await User.create({ ...data });
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

export const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};
