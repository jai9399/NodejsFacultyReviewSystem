
const express = require('express');
const cust = require('./model/user')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const router = new express.Router();
var smtpTransport = nodemailer.createTransport({
    service: "smtp.gmail.com",
    secure:true,
    port: 465,
    auth: {
        user: 'jaikathuria.freelancer@gmail.com',
        pass:  process.env.password
    }
});

router.get('/sendemail',function(req,res){
    useremail = req.query.email;
    const rand = jwt.sign({"email":useremail},process.env.jwt_secret,{expiresIn:'24h'});
    console.log(rand,'this is token');
    link="http://"+process.env.host+"/verify?id="+rand;
    mailOptions={
     to : useremail,
     subject : "Please confirm your Email account",
     html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
 }
 smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
             console.log(error);
         res.json(error);
     }else{
             console.log("Message sent: ");
         res.json("Sent");
         }
});

});
router.get('/verify',function(req,res){
    const token = req.query.id;
    console.log(token);
    const decoded = jwt.verify(token,process.env.jwt_secret);
    console.log(decoded);
    cust.findOneAndUpdate({email:decoded.email},{verified:true}).then((user)=>{
        console.log(user);
        res.send('Verified')
    })
});

module.exports = router;