const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

// MIDDLEWARE


// ROUTES
app.get('/', (req, res) => {
    res.send('You are on Home!')
})

app.get('/posts', (req, res) => {
    res.send('You are on Home!')
})



// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true,
      useUnifiedTopology: true },
    () => console.log('connected to DB!')
);

// Listen to server
app.listen(3000);