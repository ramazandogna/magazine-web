const ElementData = require('../models/elementData');

//sendElementData endpoint
const submitElementData = async (req, res) => {
   try {
      const { html, css, image, user } = req.body;
      const sendData = await ElementData.create({
         html,
         css,
         image,
         user: user,
      });

      return res.json({
         message: 'register success',
         sendData,
      });
   } catch (error) {
      console.error(error);
   }
};

//getElementsData endpoint

const getElementsData = (req, res) => {};

module.exports = {
   submitElementData,
   getElementsData,
};
