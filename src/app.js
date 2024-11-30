const express = require('express');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/files', fileRoutes);

module.exports = app;