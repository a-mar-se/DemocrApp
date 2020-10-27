import express from 'express';
import {
  listData,
  createData,
  listPerson,
  editPerson,
  deletePerson,
} from '../controllers/db.js';
import authorize from '../middleware/auth.js';
import { listAllUsers, createNewUser, signIn } from '../controllers/user.js';
import db from '../models/db.js';

const dbRouter = express.Router();

dbRouter.post('/newUser', createNewUser);
dbRouter.get('/users', listAllUsers);
dbRouter.post('/login', signIn);
dbRouter.get('/all', listData);
dbRouter.get('/:id', listPerson);
dbRouter.put('/:id', authorize, editPerson);
dbRouter.delete('/:id', authorize, deletePerson);
dbRouter.post('/', createData);

export default dbRouter;
