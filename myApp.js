require('dotenv').config()
var express = require('express');
var app = express();
console.log('Hello World');

// app.get('/', (req, res) => {
//   res.send('Hello Express');
// })

console.log(__dirname);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

//'/public' before , because of <link rel="stylesheet" href="/public/style.css"> in index.html
app.use('/public', express.static(__dirname + '/public')); 

if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello World".toUpperCase();
} else {
    response = "Hello World";
}
const message = {"message": response}; // must ""
app.get('/json', (req, res) => {
  res.json(message);
})
































 module.exports = app;
