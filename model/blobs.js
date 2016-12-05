var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  name: String,
  address: String,
  favColor: String,
  favBeverage: String,
  favSnack: String,
  favBookAuthor: String,
  favScent: String,
  videoGameConsole: String,
  favSportTeam: String,
  iCollect: String,
  listHobbies: String,
  favStores: String,
  shirtSize: String,
  shoeSize: String,
  iRead: String,
  iWant: String
//   badge: Number,
//   dob: { type: Date, default: Date.now },
//   isloved: Boolean
});
mongoose.model('form', blobSchema);