const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  car: {
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    trim: { type: String, required: true },
    mileage: { type: Number, required: true }
  },
  price: {
    type: Number,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    default: Date().toLocaleString()
  }
  // ,
  // photo:{
  //! Upload profile pic link and save ID directly LINK: https://stackoverflow.com/questions/44803800/how-to-store-profile-pictures-in-nodejs-mongodb
  // }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        const validEmail = email.includes("@");
        return validEmail;
      }
    }
  },
  listings: [listingSchema]
});

const user = mongoose.model("user", userSchema);
const listing = mongoose.model("listing", listingSchema);
module.exports = {
  User: user,
  Listing: listing
};
