const mongoose = require('mongoose');
mongoose.connect(MONGO_URL,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
});