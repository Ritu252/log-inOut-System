const express = require('express');
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String
})

let User = mongoose.model('users', userSchema);

module.exports = User;