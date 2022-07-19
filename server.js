const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const passport = require('passport');
const mongoose = require('mongoose');
const user = require('./routes/user_routes.js');
const { v4: uuidv4 } = require("uuid");
require('./auth');


const router = require('./router');

const app = express();

const port = process.env.PORT || 3000;

let a = mongoose.connect(`mongodb+srv://ritu7631:ritu@cluster0.do7g4ld.mongodb.net/test?retryWrites=true&w=majority`)
if(a){
    console.log("success",a)
}else{
    console.log("err")
}

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use('/user',user);

app.set('view engine', 'ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

// home route
app.get('/', (req, res) =>{
    res.render('base', { title : "Login System"});
})

app.listen(port, ()=>{ console.log("Listening to the server on http://localhost:3000")});