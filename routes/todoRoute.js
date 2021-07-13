const express = require ('express');
const todoController = require ('../controllers/todoController');
const authController = require ('./../controllers/authController');
const router = express.Router ();
router.use (authController.isLoggedIn);



router.post ('/',authController.protect ,todoController.createTodo);
router.get ('/getAll',authController.protect, todoController.getAllTodo);
router.get ('/getById/:id',authController.protect, todoController.getTodoById);
router.put ('/updateById/:id',authController.protect, todoController.updateTodo);
router.delete ('/deleteById/:id', authController.protect,todoController.deleteTodo);

module.exports = router;