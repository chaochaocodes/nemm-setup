const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');


// MIDDLEWARE
// bodyParser will run every time we hit a request
app.use(bodyParser.json());


// IMPORT ROUTES
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);


// ROUTES
app.get('/', (req, res) => {
    res.send('You are on Home!')
})

// app.get('/posts', (req, res) => {
//     res.send('You are on Posts!')
// })


// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true,
      useUnifiedTopology: true },
    () => console.log('connected to DB!')
);

// Listen to server
app.listen(3000);