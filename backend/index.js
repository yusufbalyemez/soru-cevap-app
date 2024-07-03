const express = require('express');
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

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', questionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});