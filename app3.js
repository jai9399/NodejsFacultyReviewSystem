const express = require('express');
const cust = require('./model/user')
const router = new express.Router();
const bcrypt = require('bcryptjs');
const auth = require('./auth')
const existcomment = require('./auth2');
const nocomment = require('./auth3');
const faculties = require('./model/facinfo');
router.get('/logout',auth,function(req,res){
    res.clearCookie('user');
    res.send('Logged Out')
})
router.post('/login',async function(req,res){
    console.log(req.body)
    cust.findOne({email:req.body.email}).then((user)=>{
        const userdata = user;
        console.log(userdata);
        if(userdata==null){
            res.send('No user with that email password combination!');
        }
        if(userdata.verified==false){
            res.send('Please Verify Email First');
        }
        else{
            bcrypt.compare(req.body.password,userdata.password,function(err,result){
               if(err){
                  res.send('Some error Occured!')
               }
               else{
                   if(result==true){//logged in
                      res.cookie('user',userdata,{maxAge:10000000,httpOnly:false});
                      res.send('Logged in')
                   }
                   else{ //login failed
                    res.send('No user with that email password combination!');
                   }
               }});}})})

router.post('/signup',async function(req,res){
    console.log(req.query);
    if(req.body.email == '' || req.body.password == '' || !req.body.password || !req.body.email){
        return res.send('Must Contain Values')
    }
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        if (err) {
        res.send(err);
        }
    req.body.password = hash;
    console.log(req.body)
    const userid = new cust(req.body);
    try{
        userid.save(function(err){
        if(err){ 
         res.send(err);
        }else{
          console.log("success");
          res.send('Success!Account Created');
        }
      });
    }
    catch(e){
        res.send(e);
    }
      });       
});
router.post('/faculty/:id/comment',auth,nocomment,async function(req,res){
    const sentuser = req.cookies.user;
    const json = {...req.body,useremail:sentuser.email};
    await faculties.findOne({_id:req.params.id}).then(async (faculty)=>{
        let comments = faculty.comments;
        comments.push(json);
        await faculties.findOneAndUpdate({_id:req.params.id},{comments:comments});
        res.send('done');
    }).catch((e)=>{
        res.send('error',e)
    })
});
router.get('/faculty/:id/comment/delete',auth,existcomment,async function(req,res){
    const sentemail = req.cookies.user.email;
    await faculties.findOne({_id:req.params.id}).then(async (faculty)=>{
        let comments = faculty.comments;
        comments.forEach(async (element,index,comments) =>{
            if(element.useremail == sentemail){
                console.log(comments[index])
                comments[index] = "";
            }});
            console.log(comments);
            await faculties.findOneAndUpdate({_id:req.params.id},{comments:comments});
            res.send('Deleted');
    }).catch((e)=>{
        res.send('error',e)
    })
})
router.get('/faculty/:id/empcomments',async function(req,res){
    await faculties.findOne({_id:req.params.id}).then(async (faculty)=>{
            let comments = [];
            await faculties.findOneAndUpdate({_id:req.params.id},{comments:comments});
            res.send('Updated');
    }).catch((e)=>{
        res.send('error',e)
    })
})
router.post('/faculty/:id/comment/update',auth,existcomment,async function(req,res){
    const sentemail = req.cookies.user.email;
    const json = {...req.body,useremail:sentemail};
    await faculties.findOne({_id:req.params.id}).then(async (faculty)=>{
        let comments = faculty.comments;
        comments.forEach(async(element,index,comments) =>{
            if(element.useremail == sentemail){
                comments[index]= json;
            }            
        })
            console.log(comments);
            await faculties.findOneAndUpdate({_id:req.params.id},{comments:comments});
            res.send('Updated');
    }).catch((e)=>{
        res.send('error',e)
    })
})

module.exports = router;