const express = require('express');
const route = express.Router();
const User = require('../model/user.js');

route.post('/', async (req,res)=>{
    let data = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
    if(data.email===req.body.email ){
        res.send("Login Successful");
    }
})


route.post('/save', async (req,res)=>{
    const body = req.body;
    const data = new User({
        email: body.email,
        password: body.password
    })
    let savedata = await data.save();
    if(savedata){
        res.send(savedata);
    }
    else{
        console.log(err);
    }
})

module.exports = route;


