import express from 'express';
import { listData, createData } from '../controllers/db.js';
import { authorize, authorizePoll } from '../middleware/auth.js';
import {
  listAllUsers,
  createNewUser,
  signIn,
  editPerson,
  editPerson2,
  deletePerson,
  listPerson,
} from '../controllers/user.js';

import {
  createNewPoll,
  listAllPolls,
  listSinglePoll,
  editPoll,
  listRandomPoll,
  deletePoll,
} from '../controllers/polls.js';
import db from '../models/db.js';

const dbRouter = express.Router();

dbRouter.post('/newUser', createNewUser);
dbRouter.get('/users', listAllUsers);
dbRouter.post('/login', signIn);
dbRouter.get('/all', listData);
dbRouter.get('/user/:id', listPerson); // Can I delete thiso ne?
dbRouter.put('/edit/:id', authorize, editPerson2);
dbRouter.delete('/delete/:id', authorize, deletePerson);
// dbRouter.post('/', createData);

dbRouter.post('/newPoll', createNewPoll);
dbRouter.get('/polls', listAllPolls);
dbRouter.get('/poll/:id', listSinglePoll);
dbRouter.get('/randompoll', listRandomPoll);
dbRouter.put('/poll/edit/:id', authorizePoll, editPoll);
dbRouter.delete('/poll/delete/:id', authorizePoll, deletePoll);

export default dbRouter;
