const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let mongoUrl = process.env.DATABASEURL;
console.log(mongoUrl);
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => {
    console.log('database connected successfully at', mongoUrl);
}).catch((error) => {
    console.log('error in connecting with database ', error);
});
