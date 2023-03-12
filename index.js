import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';

//userController
import * as UserController from './controllers/UserController.js';
import * as UsersRecordsController from './controllers/UsersRecordsController.js';

//Connect DB
mongoose.connect(
    'mongodb+srv://iturturika89:ozzy@cluster0.npblntb.mongodb.net/invoker-game?retryWrites=true&w=majority'
).then(() => {console.log('ok DB')})
.catch((err) => {console.log('DB error: ' + err)});

//Create express app
const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/user', checkAuth, UserController.getUser);

app.patch('/aprove-registration', checkAuth, UserController.aproveReg);

app.post('/users-records', checkAuth, UsersRecordsController.setRecord);

app.patch('/users-records', checkAuth, UsersRecordsController.updateRecord);

app.get('/users-records', checkAuth, UsersRecordsController.getRecords);

app.listen(4444, (err) => {
    if(err){
        return console.log(err);
    }
    console.log(`listening on `);
});