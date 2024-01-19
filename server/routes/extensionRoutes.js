const express = require('express');
const router = express.Router();
const cors = require('cors');

const { sendElementExtensionToApp } = require('../controllers/extensionToApp');

//middleware
router.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true,
   })
);

router.post('/extensiontoapp', sendElementExtensionToApp);

module.exports = router;
