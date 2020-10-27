import express from 'express';
import {
  listData,
  createData,
  listPerson,
  editPerson,
  deletePerson,
} from '../controllers/db.js';

import { listAllUsers, createNewUser, signIn } from '../controllers/user.js';
import db from '../models/db.js';

const dbRouter = express.Router();

dbRouter.post('/newUser', createNewUser);
dbRouter.get('/users', listAllUsers);
dbRouter.post('/sign_in', signIn);
dbRouter.get('/all', listData);
dbRouter.get('/:id', listPerson);
dbRouter.put('/:id', editPerson);
dbRouter.delete('/:id', deletePerson);
dbRouter.post('/', createData);

export default dbRouter;
