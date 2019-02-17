const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node');
mongoose.Promise = global.Promise;

module.exports = mongoose;