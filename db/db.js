const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
mongoose.connect(url,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected')
})