const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const listingSchema = new mongoose.Schema({
    car: {
        year: { type: Number, required: true},
        make: { type: String, required: true},
        model: { type: String, required: true},
        trim: { type: String, required: true},
        mileage: { type: Number, required: true}
    },
    price:{
        type: Number,
        required: true
    },
    zip:{
        type: Number,
        required: true
    },
    date_added:{
        type: Date,
        default: Date().toLocaleString()
    }
    // ,
    // photo:{
    //! Upload profile pic link and save ID directly LINK: https://stackoverflow.com/questions/44803800/how-to-store-profile-pictures-in-nodejs-mongodb 
    // }
})

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
                const validEmail = email.includes("@")
                return validEmail;
            }
        }
    },

    listings: [listingSchema]
});

// // * Bcrypt 
// userSchema.pre(save, function(next) { 
//     var user = this;

//     // only hash the password if it is new or modified
//     if (!user.isModified('password')) return next()

//     // generate salt
//     bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
//         if (err) return next(err);
        
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);

//             //override cleartext password with hashed password
//             user.password = hash;
//             next();
//         })
//     })
// })

// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) return cb(err)
//         cb(null, isMatch)
//     })
// }

const user = mongoose.model("user", userSchema)
const listing = mongoose.model("listing", listingSchema)
module.exports = {
    User: user,
    Listing: listing
};