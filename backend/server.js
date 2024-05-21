// attach environment variables that we want to hide
require('dotenv').config();

// import libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import routes/model
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const missionRoutes = require('./routes/missionRoutes');

// express app
const app = express();

// middleware --> executes at the start of every request, before callback function
app.use(cors());
app.use(express.json());

//connect to database and listen for requests
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });