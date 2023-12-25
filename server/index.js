const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
dotenv.config();

//app connect
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.log(err, 'Connect to MongoDB failed'));

const app = express();

app.use('/', require('./routes/authRoutes'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
