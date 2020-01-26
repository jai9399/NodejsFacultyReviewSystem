const mongoose = require('mongoose');
const validator = require('validator');
const UserSchema = mongoose.Schema(
       {
        email:{
          type:String,
          required:true,
          unique:true,
          validate(value){
            const pattern = "([a-z].*[.][a-z].*[2][0][1-2][0-9]@vitstudent.ac.in$)"
            if(!validator.isEmail(value) || !value.match(pattern)){
              throw new Error('Must use a Valid VIT Email Address')
            }                            
        }},
        password:{
          type:String,
          required:[true,'Error Duplicate Entry'],
        },
        verified:{
          type:Boolean,
          default:false
        }
       }
      );
const users = mongoose.model('User',UserSchema);

module.exports = users;