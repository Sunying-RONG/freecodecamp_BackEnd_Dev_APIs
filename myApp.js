require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
console.log('Hello World');

// app.get('/', (req, res) => {
//   res.send('Hello Express');
// })

console.log(__dirname);

// --middleware-- for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    // Call the next function in line:
    next();
  });
// --middleware--


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

//'/public' before , because of <link rel="stylesheet" href="/public/style.css"> in index.html
app.use('/public', express.static(__dirname + '/public')); 

if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello World".toUpperCase();
} else {
    response = "Hello World"; // JSON must ""
}
const message = {message: response}; 
app.get('/json', (req, res) => {
  res.json(message);
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({ time : req.time });
})

app.get('/:word/echo', (req, res) => {
    console.log(req.params);
    const { word } = req.params;
    console.log(word);
    res.json({ echo : word });
})

app.get('/name', (req, res) => {
    const { first, last } = req.query;
    res.json( { name : `${first} ${last}` });
})

app.post('/name', (req, res) => {
    const { first, last } = req.body;
    res.json( { name : `${first} ${last}` });
})

























 module.exports = app;
