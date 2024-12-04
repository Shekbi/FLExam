var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1/sportsApp')
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs')
app.set('views','./views')

var home = require('./home')
app.use('/',home)

app.listen(3000, function(req,res){
    console.log("Connected to server at port 3000")
})