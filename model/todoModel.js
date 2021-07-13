const mongoose = require ('mongoose');

const todoSchema = new mongoose.Schema (
  {
    // schema type option
    paragraph: {
      type: String,
      maxlength: 256,
      minlength: 1,
    },
    createdBy:{
       
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: [true, 'Todo must belong to user'],
       
    },
   isCompleted:{
    type: Boolean,
   },
    createdAt: {
      type: Date,
      default: Date.now (),
    },
   
  },
  // object for options
  {
    // fields can we defiend in our schema but that will not be persisted so will not be saved into database to save some space there
    toJSON: {virtuals: true}, // each time data outputed as a json we want virtuals to be true the virtuals be part of output
    toObject: {virtuals: true}, // each time data outputed as a object we want virtuals to be true the virtuals be part of output
  }
);
 
const Todo = mongoose.model ('Todos', todoSchema);

module.exports = Todo;
