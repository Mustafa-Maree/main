const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const validator = require ('validator');
const userSchema = new mongoose.Schema (
    {
      firstName: {
        type: String,
        required: [true, 'First name is required '],
        minlength: 5,
      },
      lastName: {
        type: String,
        required: [true, 'First name is required '],
        minlength: 5,
      },
      email: {
        type: String,
        required: [true, 'Email is required '],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide  a valid email'],
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
      }});
      userSchema.pre ('save', async function (next) {
        if (!this.isModified ('password')) return next ();
        this.password = await bcrypt.hash (this.password, 12);
        // this.passwordConfirm = undefined; //to deleted from database
        next ();
      });
      userSchema.methods.correctPassword = async (
        candidatePassword,
        userPassword
      ) => {
          return await bcrypt.compare (candidatePassword, userPassword);
      };
      userSchema.methods.changedPasswordAfter = function (JWTTimstamp) {
        if (this.passwordChangedAt) {
          const changedPassword = parseInt (
            this.passwordChangedAt.getTime () / 1000,
            10
          );
       
          // if true that means password changed if false password not changed
          return JWTTimstamp < changedPassword;
        }
      
        return false;
      };
      const User = mongoose.model ('Users', userSchema);
      
      module.exports = User;
      