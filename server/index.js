const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const AuthRoute = require('./Routes/Authenticate');
const NotesRoute = require('./Routes/Notes');

mongoose.connect('mongodb://localhost:27017/notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (error) => {
  console.log(error);
});

db.once('open', () => {
  console.log('Database Connection Established');
});

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use('/api', AuthRoute);
app.use('/api/notes', NotesRoute);
