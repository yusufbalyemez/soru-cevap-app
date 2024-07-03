const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionRoutes = require('./routes/questionsRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', questionRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

module.exports = app;