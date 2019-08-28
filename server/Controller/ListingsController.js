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
    },
    editListing: (req, res, next) => {
        const { id } = req.params;
        // const { car, price, zip } = req.body;

        Listing.findById(id).then(foundListing => {
            foundListing = req.body;

            Listing.findById(id).then(listing => {
                res.status(200).send(listing)
                console.log(listing);
            })
        })
    }
    // ,
    // deleteListing: 
    // getUserListings:
}