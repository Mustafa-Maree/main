const express = require ('express');
const path = require ('path');
const App = express ();
const todoRoute = require('./routes/todoRoute')
const userRoute = require('./routes/userRoute')
App.use (express.json ());

App.use ('/api/v1/todo', todoRoute);
App.use ('/api/v1/user', userRoute);

 
module.exports = App;
