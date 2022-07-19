var express = require("express");
const session = require('express-session');
const passport = require('passport');
const path = require('path');
var router = express.Router();
const User = require('./model/user');
require('./auth');


router.use(session({secret:'cats',resave: false, saveUninitialized: true}));
router.use(passport.initialize());
router.use(passport.session());


// const  credential = {
//     email : "admin@gmail.com",
//     password : "admin123"
// }

// login user
router.post('/login',async(req, res)=>{
    // if(req.body.email == credential.email && req.body.password == credential.password){
    //     req.session.user = req.body.email;
    //     res.redirect('/route/dashboard');
    //     //res.end("Login Successful...!");
    // }else{
    //     res.end("Invalid Username")
    // }
    let data = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
    if(data){
        if(data.email===req.body.email && data.password === req.body.password){
            // res.send("Login Successful");
            req.session.user = req.body.email;
            res.redirect('/route/dashboard');
        }
    }
   else{
        res.redirect('/route/failed');
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
        //res.render('failed')
    }
})
router.get('/failed', (req, res) => {
    res.render('failed');
})
// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})


router.post('/failed', async (req,res)=>{
    const body = req.body;
    const data = new User({
        name: body.name,
        email: body.email,
        phone : body.phone,
        password: body.password
    })
    let savedata = await data.save();
    if(savedata){
        res.render('base');
    }
    else{
        console.log(err);
    }
})


router.get('/auth/google',()=>{
    console.log("success")
})

router.get('/auth/google/callback',
    passport.authenticate('google',{
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
)

router.get('/auth/google/failure', (req,res)=>{
    res.send('something went wrong..');
})

module.exports = router;