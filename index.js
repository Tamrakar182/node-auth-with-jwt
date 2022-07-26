const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//import routes
const authRoute = require('./routes/auth');

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

app.listen(3000, () => console.log('Server is Up and Running'));

// maxmillan schwaxmuller