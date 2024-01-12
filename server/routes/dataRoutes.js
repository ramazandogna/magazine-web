const express = require('express');
const router = express.Router();
const cors = require('cors');

const { submitElementData, getElementsData } = require('../controllers/sendDataController');

//middleware
router.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true,
   })
);

router.post('/submitelement', submitElementData);
router.get('/getcontents', getElementsData);

module.exports = router;
