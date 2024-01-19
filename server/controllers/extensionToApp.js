// controllers/elementController.js
const ElementData = require('../models/extensionToApp');

const sendElementExtensionToApp = async (req, res) => {
   try {
      const { clickedElement, elementInfos, status } = req.body.data;

      // Verileri veritabanına kaydet
      const elementData = new ElementData({
         clickedElement,
         elementInfos,
         status,
      });

      console.log('this is extensioncontroller message');
      await elementData.save();

      res.status(200).json({ success: true, message: 'Veri başarıyla kaydedildi.' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Bir hata oluştu.' });
   }
};

module.exports = { sendElementExtensionToApp };
