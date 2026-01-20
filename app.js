const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

module.exports = app;

// Add middleware for handling CORS requests from index.html


// Add middware for parsing request bodies here:


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');

app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRouter);

module.exports = app;

