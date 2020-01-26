const auth = function(req,res,next){
    if(req.cookies.user==null)
    res.send('verify');
    else{
    next();
    }
}
module.exports = auth;