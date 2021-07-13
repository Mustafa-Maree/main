const {promisify} = require ('util');
const jwt = require ('jsonwebtoken');
const User = require ('./../model/userModel');
const signToken = id => {
  return jwt.sign ({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken (user._id);
  const cookieOption = {
    expires: new Date (
      Date.now () + process.env.JWT_Cookie_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res.cookie ('jwt', token, cookieOption);
  res.status (statusCode).json ({
    status: 'sucess',
    token,
    data: {
      user,
    },
  });
};
exports.logout = (req, res) => {
  res.cookie ('jwt', 'loggedout', {
    expires: new Date (Date.now () + 10 * 1000),
    httpOnly: true,
  });
  res.status (200).json ({status: 'success'});
};

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
   
    if (!email || !password) {
      
      next (err);
    }
     const user = await User.findOne ({email}).select ('+password');
     if (!user || !(await user.correctPassword (password, user.password))) {
     }
    createSendToken (user, 200, res);
  } catch (err) {
      res.status (500).json ({
      status: 'Bad resquest !',
    });
  }
};
 
exports.protect = async (req, res, next) => {
   let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith ('Bearer')
  ) {
    token = req.headers.authorization.split (' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
   if (!token) {
    return next (err);
  }

 
  const decoded = await promisify (jwt.verify) (token, process.env.JWT_SECRET);
 
   const freshUser = await User.findById (decoded.id);
  if (!freshUser) {
    next (err);
  }
 

   req.user = freshUser;  
 
  next ();
};
 
exports.isLoggedIn = async (req, res, next) => {
  try {
      let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith ('Bearer')
      )   {
        token = req.headers.authorization.split (' ')[1];
        const decoded = await promisify (jwt.verify) (
            token,
            process.env.JWT_SECRET
          );
        const freshUser = await User.findById (decoded.id);
        if (!freshUser) {
          return next ();
        }  
         
        req.user = freshUser;
        return next ();

    }
  } catch (err) {
     return next ();
  }
  next ();
};
