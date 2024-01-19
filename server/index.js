const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

//app connect
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.log(err, 'Connect to MongoDB failed'));

//midleware
const corsOptions = {
   origin: 'http://localhost:5173',
   credentials: true,
   optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/auth', require('./routes/authRoutes'));
app.use('/data', require('./routes/dataRoutes'));
app.use('/extension', require('./routes/extensionRoutes'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
