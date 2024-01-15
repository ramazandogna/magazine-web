const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
   submitElementData,
   getElementsData,
   deleteElementsData,
   updateElementData,
} = require('../controllers/sendDataController');

//middleware
router.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true,
   })
);

router.post('/submitelement', submitElementData);
router.get('/getcontents', getElementsData);
router.put('/updateelement/:contentId', updateElementData);
router.delete('/deleteelement/:contentId', deleteElementsData);

module.exports = router;
