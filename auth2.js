
const faculties = require('./model/facinfo');
const existcomment = async function(req,res,next){
    const sentuser = req.cookies.user;
    let flag=0;
    console.log(req.params.id);
    await faculties.findOne({"_id":req.params.id}).then(async (faculty)=>{
        console.log(faculty);
           let comments = faculty.comments;
            comments.forEach(element => {
                if(element.useremail == sentuser.email){
                    flag=1;
                    console.log('Found');
                }    
            });
            if(flag==1){
                console.log('sencond')
                next();
            }
            else{
            res.send('No such comment exists');
            }
          
}).catch((e)=>{
    res.send(e);
});
}

module.exports = existcomment;