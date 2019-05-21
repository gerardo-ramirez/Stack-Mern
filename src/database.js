const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, user: process.env.USER, pass: process.env.PASS,
}).then(db => console.log('connected db'))
    .catch(err => console.log('err in connected'));
module.exports = mongoose;