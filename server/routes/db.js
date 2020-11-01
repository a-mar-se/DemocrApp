import express from 'express';
import { listData, createData } from '../controllers/db.js';
import { authorize, authorizePoll } from '../middleware/auth.js';
import {
  listAllUsers,
  createNewUser,
  signIn,
  editPerson2,
  deletePerson,
  listPerson,
  listUserData,
} from '../controllers/user.js';

import {
  createNewPoll,
  listAllPolls,
  listAll,
  listSinglePoll,
  editPoll,
  listRandomPoll,
  listComments,
  deletePoll,
  createNewComment,
} from '../controllers/polls.js';
import login from '../middleware/login.js';
import secureRoute from '../middleware/secureRoute.js';
// import authorizeSelf from '../middleware/authorizeSelf.js';

const dbRouter = express.Router();

dbRouter.post('/login', login);

dbRouter.post('/user-data', listUserData);
dbRouter.post('/newUser', createNewUser);
dbRouter.get('/users', listAllUsers);
dbRouter.get('/all', listData);
dbRouter.get('/user/:id', listPerson); // Can I delete thiso ne?
dbRouter.put('/edit/:id', authorize, editPerson2);
dbRouter.delete('/delete/:id', authorize, deletePerson);

dbRouter.post('/new-poll', createNewPoll);
dbRouter.post('/new-comment', createNewComment);
dbRouter.get('/polls', listAllPolls);
dbRouter.get('/allm', listAll);
dbRouter.get('/comments-by-id/:id', listComments);
dbRouter.get('/poll/:id', listSinglePoll);
dbRouter.get('/randompoll', listRandomPoll);
dbRouter.put('/poll/like/:id', secureRoute, editPoll);
dbRouter.put('/poll/edit/:id', authorizePoll, editPoll);
dbRouter.delete('/poll/delete/:id', deletePoll);

export default dbRouter;
