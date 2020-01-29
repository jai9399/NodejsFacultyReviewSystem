
const faculties = require('./model/facinfo');
const mongoose = require('mongoose')
const existcomment = async function(req,res,next){
    const sentuser = req.cookies.user;
    let flag=0;
    let comment;
    await faculties.findOne({_id:req.params.id}).then(async (faculty)=>{
           let comments = faculty.comments;
            await comments.forEach(element => {
                if(element.email == sentuser.email){
                    comment = element;
                    flag=1;
                }    
            });
}).catch((e)=>{
    res.send(e);
});
  if(flag==1){
      req.comment = comment;
       console.log('sencond')
       next();
  }
  else{
  res.send('No such comment exists');
  }
}

module.exports = existcomment;