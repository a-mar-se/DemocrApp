import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
  },
  {
    timestamps: true,
  },
);

const Data = mongoose.model('Data', dataSchema);

export const getAllData = async () => {
  try {
    return await Data.find();
  } catch (error) {
    throw new Error(error);
  }
};

export const getDataById = async (id) => {
  try {
    return await Data.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePerson = async (id, newData) => {
  try {
    console.log(id);
    // return await Data.findByIdAndUpdate(id, { ...newData });

    return await User.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const createDataResource = async (data) => {
  try {
    return await Data.create({ ...data });
  } catch (error) {
    throw new Error(error);
  }
};
export const createUserResource = async (data) => {
  try {
    return await Data.create({ ...data });
  } catch (error) {
    throw new Error(error);
  }
};

export const sendDeletePetition = async (id) => {
  try {
    return await Data.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

export default mongoose.model('Data', dataSchema);
