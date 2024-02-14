const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type:String
  },
  image:{
    type:String
  }
});

module.exports = User = mongoose.model("User", userSchema);