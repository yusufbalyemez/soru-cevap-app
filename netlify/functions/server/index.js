const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionsRoutes');
const dotenv = require('dotenv');

// .env dosyasındaki değişkenleri yükleyin
dotenv.config();

const app = express();

// MongoDB URI yükleniyor
const mongoURI = process.env.MONGO_URI;

// MongoDB'ye bağlan
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors());

const routerBasePath = process.env.NODE_ENV === 'production' ? '/.netlify/functions/server/api' : '/api';

app.use(routerBasePath, questionRoutes);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports.handler = serverless(app);