const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>{
    console.log('Connected')
})