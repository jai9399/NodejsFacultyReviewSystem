const express = require('express');
const cust = require('./model/user')
const router = new express.Router();
const bcrypt = require('bcryptjs');
const auth = require('./auth')
const faculties = require('./model/facinfo');
router.get('/logout',auth,function(req,res){
    res.clearCookie('user');
    res.send('Logged Out')
})
router.post('/login',async function(req,res){
    console.log(req.body.email)
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
                      res.cookie('user',userdata,{maxAge:100000});
                      res.send('logged in')
                   }
                   else{ //login failed
                    res.send('No user with that email password combination!');
                   }
               }});}})})

router.post('/signup',async function(req,res){

    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        if (err) {
        return res.send(err);
        }
    req.body.password = hash;
    const userid = new cust(req.body);
    try{
       await userid.save();
       res.send('Success!Account Created');
    }
    catch(e){
        res.send(e);
    }
      });       
});
router.post('/faculty/:id/comment',auth,async function(req,res){
    const sentuser = req.cookies.user;
    const json = {...req.body,useremail:sentuser.email};
    await faculties.findOne({_id:req.params.id}).then(async (faculty)=>{
        let comments = faculty.comments;
        var flag =0;
        let comment;
        comments.forEach(element => {
            if(element.useremail == sentuser.email){
               comment=element;
               flag=1;
            }
        });
        if(flag==1){
            return res.send(comment)
        }
        comments.push(json);
        await faculties.findOneAndUpdate({_id:req.params.id},{comments:comments});
        res.send('done');
    }).catch((e)=>{
        res.send('error',e)
    })
});
module.exports = router;