const models = require('../collections/Users'); 
const { Listing } = models;

module.exports = {
    getAllListings: (req, res, next) => {
        Listing.find().then(listings => {
            res.status(200).send(listings);
            console.log(listings)
        })
    },
    createNewListing: (req, res, next) => {
        const { car, price, zip } = req.body;
        const listing = new Listing({car, price, zip});

        listing.save((err) => {
            Listing.find().then(listings => {
                res.status(200).send(listings);
                console.log(listings)
            })
        });
    }
    // ,
    // editListing: 
    // ,
    // deleteListing: 
}