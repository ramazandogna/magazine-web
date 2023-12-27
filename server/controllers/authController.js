const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

//test endpoint
const test = (req, res) => {
   res.json('Hello world!, test is working.');
};

//register endpoint
const registerUser = async (req, res) => {
   try {
      const { name, username, email, password } = req.body;
      //name was entered
      if (!name) {
         return res.json({
            error: 'name is require',
         });
      }
      //check password is good
      if (!password || password.length < 6) {
         return res.json({
            error: 'password must be at least 6 characters',
         });
      }

      //check email is exist
      const exist = await User.findOne({ email });
      if (exist) {
         return res.json({
            error: 'email is exist',
         });
      }

      //create user in database
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
         name,
         email,
         password: hashedPassword,
         username,
      });

      return res.json({
         message: 'register success',
         user,
      });
   } catch (error) {
      console.log(error);
   }
};

//login endpoint
const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      //check if user exist
      const user = await User.findOne({ email });
      if (!user) {
         return res.json({
            error: 'email is not exist',
         });
      }

      //passwords match
      const match = await comparePassword(password, user.password);
      if (match) {
         jwt.sign(
            { email: user.email, id: user._id, name: user.name },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
               if (err) throw err;
               res.cookie('token', token).json(user);
            }
         );
      }
      if (!match) {
         res.json({
            error: 'Invalid password',
         });
      }
   } catch (error) {
      console.error(error);
   }
};

module.exports = {
   test,
   registerUser,
   loginUser,
};
