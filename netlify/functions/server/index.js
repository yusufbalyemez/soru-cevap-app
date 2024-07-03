const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
const questionRoutes = require('./routes/questionsRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', questionRoutes);

module.exports.handler = serverless(app);