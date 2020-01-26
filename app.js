const express = require('express');
const auth = require('./auth');
const cors = require('cors')
require('./db/db');
const faculties = require('./model/facinfo');
const router = require('./app2');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const router2 = require('./app3');
const cust = require('./model/user')
const app = express();
app.use(cors)
const path = require('path');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.resolve('./statics')));
const cookiep = require('cookie-parser');
app.use(cookiep());
app.use('/',router);
app.use('/',router2);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
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
    console.log(req.headers)
    res.send('HomePage');
})
app.get('/home',auth,function(req,res){
    res.send('Welcome'); 
});
app.get('/comment',auth,async function(req,res){
    res.send('Welcome');
});
const port = process.env.PORT;

app.listen(port,()=>{
    console.log('Server Started');
})