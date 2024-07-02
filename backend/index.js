const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionRoutes = require('./routes/questionsRoutes');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', questionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});