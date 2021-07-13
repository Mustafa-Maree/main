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
 
  {
     toJSON: {virtuals: true},  
    toObject: {virtuals: true}, 
  }
);
 
const Todo = mongoose.model ('Todos', todoSchema);

module.exports = Todo;
