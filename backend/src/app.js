const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const routes = require('./routes/route');
const xss = require('xss-clean')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());
app.use(cors());

//create cors middleware
app.use((req, res, next) => {
    //set header to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,multipart/form-data");
    next();
})

//Data sanitization against xss attact
app.use(xss());

app.use('/', routes)

//The 404 Route (ALWAYS Keep this as the last route)
app.all('*', (req, res) => {
    res.status(404).send({
        status: false,
        message: "The route you are searching for does not exists on the server"
    })
})

//Error handler
app.use((err, req, res, next) => {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send({ status: false, message: err.message })
})

//Define PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Express is running on port ' + port)
})