const mongoose = require('mongoose');
const url = process.env.MONGO;
mongoose.connect(url,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected')
})