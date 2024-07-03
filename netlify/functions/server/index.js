const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionRoutes = require('./routes/questionsRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', questionRoutes);

module.exports.handler = serverless(app);