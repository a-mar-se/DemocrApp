import mongoose from 'mongoose';
import { databaseURI } from '../index.js';
import users from './first_user.js';
import User from '../models/user.js';

mongoose.connect(databaseURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Promise.all(
  users.map(async (musicItem) => {
    const musicResource = await User.create({ ...musicItem });
    console.log(
      `The resource ${JSON.stringify(musicResource)} has been created`,
    );
  }),
);
