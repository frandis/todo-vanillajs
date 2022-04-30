const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const todoRouters = require('./routers/todoRouters');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(() => console.log('MONGO connected'));

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/Login.html'));
});
app.get('/signup', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/Signup.html'));
});

app.get('/dashboard', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/Dashboard.html'));
});
app.post('/signup', userController.signup, (req, res) => {
  return res.status(200).json(res.locals.userId);
});

app.post('/login', userController.login, (req, res) => {
  return res.status(200).json(res.locals.userId);
});

app.use('/todos', todoRouters);
app.use((req, res) => res.status(404).send('Page not found'));
//Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
