const Todo = require ('../model/todoModel');
exports.createTodo = async (req, res) => {
    try {
        req.body.createdBy=req.user._id;
      const todo = await Todo.create ({paragraph:req.body.paragraph,isCompleted:req.body.isCompleted,createdBy:req.user._id});
      res.status (201).json ({
        status: 'success',
        message: 'New Todo is Created successfully',
        data: {
            todo,
        },
      });
    } catch (err) {
      res.status (500).json ({
        status: 'fail',
        message: 'Bad request !',
      });
    }
  };
  exports.getAllTodo = async (req, res) => {
    try {
      const todo = await Todo.find ();
      console.log(todo)
      res.status (200).json ({
        status: 'success',
     
        data: {
            todo,
        },
      });
    } catch (err) {
      res.status (500).json ({
        status: 'fail',
        message: 'Bad request !',
      });
    }
  };
exports.getTodoById = async (req, res) => {
    try {
       const todo = await Todo.findById (req.params.id)
       res.status (200).json ({
        status: 'success',
         data: {
            todo,
        },
      });
    } catch (err) {
      res.status (500).json ({
        status: 'fail',
        message: 'Bad request !',
      });
    }
  };
exports.updateTodo = async (req, res) => {
    try {
      let todo = await Todo.findByIdAndUpdate (req.params.id, {
        paragraph: req.body.paragraph,

    });
      res.status (200).json ({
        status: 'success',
        message: 'Todo is Updated successfully',
        data: {
            todo,
        },
      });
    } catch (err) {
      res.status (500).json ({
        status: 'fail',
        message: 'Bad request !',
      });
    }
  };
exports.deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findOneAndRemove (req.params.id);
      res.status (200).json ({
        status: 'success',
        message: 'Todo is Deleted successfully',
        data: {
            
        },
      });
    } catch (err) {
      res.status (500).json ({
        status: 'fail',
        message: 'Bad request !',
      });
    }
  };