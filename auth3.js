const faculties = require('./model/facinfo');
const mongoose = require('mongoose')
const nocomment = async function(req,res,next){
    const sentuser = req.cookies.user;
    let flag=0;
    await faculties.findOne({_id:req.params.id}).then(async (faculty)=>{
           let comments = faculty.comments;
            await comments.forEach(element => {
                if(element.email == sentuser.email){
                    flag=1;
                }    
            });
}).catch((e)=>{
   return res.send('Error',e);
});
  if(flag==1){
      res.send('Comment already exists!');
  }
  else{
  next();
  }
}

module.exports = nocomment;