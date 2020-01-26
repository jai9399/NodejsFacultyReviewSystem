const express = require('express');
const auth = require('./auth');
require('./db/db');
const faculties = require('./model/facinfo');
const router = require('./app2');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const router2 = require('./app3');
const cust = require('./model/user')
const app = express();
const path = require('path');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.resolve('./statics')));
const cookiep = require('cookie-parser');
app.use(cookiep());
app.use('/',router);
app.use('/',router2);

app.get('/faculty',auth,function(req,res){
    faculties.find({}).then((users)=>{
        res.send(users);
    })
})
app.get('/faculty/:id',auth,function(req,res){
    try{
        const id = mongoose.Types.ObjectId(req.params.id);
        faculties.findOne({_id:id}).then((user)=>{
            console.log(user);
            res.send(user);
        }).catch((e)=>{
            res.send('No user found',e);
        })        
    }
    catch(e){
        res.send(e);
    }
});

app.get('/run',function(req,res){
    console.log(req.cookies);
    res.send('Hello');
})

app.get('/',function(req,res){
    res.sendFile(path.resolve('./statics/index.html'));
})
app.get('/home',auth,function(req,res){
    res.send('Welcome'); 
    //send homepage
});
app.get('/comment',auth,async function(req,res){
    res.send('Welcome');
});
const port = 3000 || process.env.PORT;

app.listen(port,()=>{
    console.log('Server Started');
})