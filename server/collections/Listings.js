const mongoose = require("monggose");

const listingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //! Listing

    userId: {}, //* push objectId form user to here

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
    }
    // ,
    // photo:{
    //! Upload profile pic link and save ID directly LINK: https://stackoverflow.com/questions/44803800/how-to-store-profile-pictures-in-nodejs-mongodb 
    // }
    

})

module.exports = mongoose.model("listing", listingSchema)


//! $lookup: joins as an array so use this to make listings for user
// db.collections.aggregate([
//     { $lookup:
//        { 
//            from: collection,
//            localField: "listings",
//            foreignField: "userId",
//            as: "userId"
//         }
//     }
// ])