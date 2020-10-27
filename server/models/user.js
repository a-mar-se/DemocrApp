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
