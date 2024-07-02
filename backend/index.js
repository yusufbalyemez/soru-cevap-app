const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionsRoutes = require('./routes/questionsRoutes');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use('/api', questionsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});