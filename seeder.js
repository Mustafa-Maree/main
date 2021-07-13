var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/Todos', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'model/todoModel.js',
    'model/userModel.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Users', 'Todos'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function(err,done) {
        if(err){
            return console.log("seed error",err)
        }
        if(done){
            return console.log("seed done",done)
        }
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Users',
        'documents': [
            {
                '_id': '60ecc2addc47e96cc8e01bbd',
                'firstName': "mustafa",
                'lastName':"maree",
                'email':"mr.dev1@gmail.com",
                "password":"meez@123"
            }]
        
    },
    {
        'model': 'Todos',
        'documents': [
           {
                '_id':'60ecc3bc0d43da64683ff6a8',
                'createdAt':'2021-07-12T22:35:32.040+00:00',
                'paragraph':'todo1',
                'isCompleted':0,
                'createdBy':'60ecc2addc47e96cc8e01bbd'
            },
           {
                '_id':'60ecc3bc0d43da64683ff6a9',
                'createdAt':'2021-07-12T22:35:32.040+00:00',
                'paragraph':'todo2',
                'isCompleted':0,
                'createdBy':'60ecc2addc47e96cc8e01bbd'
            },
           {
                '_id':'60ecc3bc0d43da64683ff2a8',
                'createdAt':'2021-07-12T22:35:32.040+00:00',
                'paragraph':'todo3',
                'isCompleted':0,
                'createdBy':'60ecc2addc47e96cc8e01bbd'
            },
        
        ]
       
    }
];