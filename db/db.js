const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Jai290100:Jai290100mygtag@cluster0-6p1p9.mongodb.net/facinf?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected')
})