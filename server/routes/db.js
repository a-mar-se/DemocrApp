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
  deleteAll,
  listElements,
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
  likePoll,
  dislikePoll,
} from '../controllers/polls.js';
import login from '../middleware/login.js';
import secureRoute from '../middleware/secureRoute.js';
// import authorizeSelf from '../middleware/authorizeSelf.js';

const dbRouter = express.Router();

dbRouter.post('/login', login);
dbRouter.post('/new-user', createNewUser);

dbRouter.get('/users', listAllUsers);
dbRouter.get('/all', listData);
dbRouter.get('/user/:id', listPerson);

dbRouter.get('/polls', listAllPolls);
dbRouter.get('/allm', listAll);
dbRouter.get('/comments-by-id/:id', listComments);
dbRouter.get('/poll/:id', listSinglePoll);
dbRouter.get('/randompoll', listRandomPoll);

// Post
dbRouter.post('/find-elements', listElements);

dbRouter.post('/user-data', secureRoute, listUserData);
dbRouter.post('/new-poll', secureRoute, createNewPoll);
dbRouter.post('/new-comment', secureRoute, createNewComment);
dbRouter.put('/poll/like/:id', secureRoute, likePoll);
dbRouter.put('/poll/dislike/:id', secureRoute, dislikePoll);

// Update
dbRouter.put('/edit/:id', secureRoute, authorize, editPerson2);
dbRouter.put('/poll/edit/:id', secureRoute, authorize, editPoll);
//Delete
dbRouter.delete('/delete/:id', secureRoute, authorize, deletePerson);
dbRouter.delete('/poll/delete/:id', secureRoute, authorize, deletePoll);
// dbRouter.delete('/alldelete', deleteAll);

export default dbRouter;
