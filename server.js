const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const initCookie = require('./server/middleware/cookie/initCookie');
require('dotenv').config();
const notification = require('./server/notification/notification')
const app = express();
initCookie(app);
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true,
}));


require('./server/routes/router')(app);
notification(app);
module.exports = app;
