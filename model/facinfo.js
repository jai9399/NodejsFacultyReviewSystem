const mongoose = require('mongoose');
const FacultySchema = new mongoose.Schema({
    facinfo:{
        type:JSON,
        required:true
    },
    comments:[]
});
const Faculty = mongoose.model('Faculty',FacultySchema,'faculties');

module.exports = Faculty;
