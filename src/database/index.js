const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;