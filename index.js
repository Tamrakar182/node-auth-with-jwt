const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config({
    path:"./config.env"
});

//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    () => console.log('connect to db!')
);

//middleware
app.use(express.json());
  
//router middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute)

app.listen(3000, () => console.log('Server is Up and Running'));

//more commments to add to commit
//i know this is petty but a man's gotta do what a man's gotta do
