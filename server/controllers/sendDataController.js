const ElementData = require('../models/elementData');
const submitElementData = async (req, res) => {
   try {
      const { html, css, image, userId } = req.body;

      const sendData = await ElementData.create({
         userId,
         html,
         css,
         image,
      });
      return res.json({
         message: 'register success',
         sendData,
      });
   } catch (error) {
      console.error(error);
   }
};

const registerUser = async (req, res) => {
   try {
      const { name, username, email, password, activateKey, admin } = req.body;
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
         activateKey,
         admin,
      });

      return res.json({
         message: 'register success',
         user,
      });
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   submitElementData,
};
