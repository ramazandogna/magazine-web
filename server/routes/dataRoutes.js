const express = require('express');
const router = express.Router();
const cors = require('cors');

const { submitElementData } = require('../controllers/sendDataController');

//middleware
router.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true,
   })
);

router.post('/submitelement', submitElementData);

module.exports = router;
