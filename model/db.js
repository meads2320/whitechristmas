var mongoose = require('mongoose');
var user = process.env.MONGO_USER;
var pass = process.env.MONGO_PASS;
var url = (user && pass) ? 'mongodb://' + user + ':' + pass + '@ds050869.mlab.com:50869/christmas_list' : "mongodb://localhost:27017/christmas_list";
mongoose.connect(url);