const express = require("express");
const app = express()
const cors = require('cors');
require('dotenv').config();  // load envirnment variable
const connectDb = require("./Database/ConnectDB");

// Parse incomeing request 
app.use(express.json())
// allow client to connect server
app.use(cors());

// connect Database
connectDb();

// test api
app.get('/' , (request , response) => {
    response.status(200).json({message : "test api is running"})
})

const authRoute = require('./Route/authRoute.js');
const bookRoute = require('./Route/bookRoute.js');

// Routes
app.use(authRoute);
app.use(bookRoute);


app.listen(8001);