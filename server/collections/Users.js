const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const userSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },

    username: {
        type: String,
        required: true
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
    }
});

userSchema.pre(save, function(next) { 
    var user = this;

    // only hash the password if it is new or modified
    if (!user.isModified('password')) return next()

    // generate salt
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) return next(err);
        
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            //override cleartext password with hashed password
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model("users", userSchema)