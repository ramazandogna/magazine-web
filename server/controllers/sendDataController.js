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
      res.status(500).json({ error: 'internal server error' });
   }
};

//getElementsData endpoint

const getElementsData = async (req, res) => {
   try {
      const elementData = await ElementData.find();
      res.json(elementData);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
};

const deleteElementsData = async (req, res) => {
   try {
      const { contentId } = req.params;
      const deletedData = await ElementData.findByIdAndDelete(contentId);

      if (!deletedData) {
         return res.status(404).json({ error: 'Content not found' });
      }

      res.json({
         message: 'Content deleted successfully',
         deletedData,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
   }
};

const updateElementData = async (req, res) => {
   try {
      const { contentId } = req.params;
      const { html, css } = req.body;
      const updateData = await ElementData.findByIdAndUpdate(
         contentId,
         { html: html, css: css },
         { new: true }
      );
      res.json({
         message: 'update was successfully',
         updateData: updateData,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
};

module.exports = {
   submitElementData,
   getElementsData,
   deleteElementsData,
   updateElementData,
};
