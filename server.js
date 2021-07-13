const App = require ('./app');

const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const express = require ('express');
const app = express ();
 
dotenv.config ({path: './config.env'});
const DB = process.env.DATABASE_LOCAL.replace (
  '<PASSWORD>',
  process.env.PASSWORD
);
mongoose
  .connect (DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then (() => {
    console.log ('DB CONNECTED SUCCESSFULLY');
  });

const port = 2020 || process.env.PORT;
App.listen (port, () => {
  console.log (`server connected on port : ${port}`);
});
