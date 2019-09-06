const models = require("../collections/Users");
const { User, Listing } = models;
const utils = require("../../src/daniel-unit-tests/functions")

module.exports = {
  getAllListings: (req, res, next) => {
    Listing.find().then(listings => {
      res.status(200).send(listings);
      console.log(listings);
    });
  },

  createNewListing: (req, res, next) => {
    const { car, price, zip, photos } = req.body;
    const newListing = new Listing({ car, price, zip, photos });
    console.log(req.body)

    utils.isValidNumber(price);
    utils.isValidNumber(zip);

    newListing.save(err => {
      User.findById(req.session.user.id).then(currentUser => {
        currentUser.listings.push(newListing);
        currentUser.save((err) => {
          console.log(err)
          res.status(200).send(currentUser);
        });
        console.log('')
        console.log('')
        console.log('')
        console.log('')
        console.log('')
        console.log(currentUser.listings);
      });
    });
  },

  getListing: (req, res, next) => {
    const { id } = req.params;
    Listing.findById(id).then(listing => {
      res.status(200).send(listing);
      console.log(listing);
    });
  },

  editListing: (req, res, next) => {
    const { id } = req.params;
    const { car, price, zip, photos } = req.body;

    User.findById(req.session.user.id).then(currentUser => {
      //* find Index
      let index = currentUser.listings.findIndex(listing => {
        return id == listing._id;
      });
      if (index === -1) {
        console.log("Error: Check editListing in ListingsController");
      } else {
        currentUser.listings[index] = {
          car: car,
          price: price,
          zip: zip
        };
      }

      currentUser.save(err => {
        res.status(200).send(currentUser.listings);
        console.log(currentUser.listings);
      });
    });
  },
  deleteListing: (req, res, next) => {
    const { id } = req.params;

    User.findById(req.session.user.id).then(currentUser => {
      let index = currentUser.listings.findIndex(listing => {
        return id == listing._id;
      });
      if (index === -1) {
        console.log("Error: Check deleteListing in ListingsController");
      } else {
        Listing.deleteOne(currentUser.listings[index]).then(res => {
          Listing.save(err => {
            console.log("User: " + currentUser.username + "deleted a listing")
          })
        })
        currentUser.listings.splice(index, 1);
      }

      currentUser.save(err => {
        res.status(200).send(currentUser.listings);
        console.log(
          "Changes to User: " + currentUser.username + "'s listings saved"
        );
      });
    });
  },

  getUserListings: (req, res, next) => {
    const { id } = req.session.user;
    User.findById(id).then(currentUser => {
      let userListings = currentUser.listings;
      res.status(200).send(userListings);
    });
  },

  getUserContact: (req, res, next) => {
    const { id } = req.params
    // const { typed } = req.body;

    User.find({ 'listings._id': id}).then(foundUser => {
      console.log("the user is: " + foundUser)
      console.log(id)
      res.status(200).send(foundUser);
    });
  }
  // const { id } = req.params;
  // Listing.findById(id).then(listing => {
  //   res.status(200).send(listing);
  //   console.log(listing); 
  //* {listings: [{id}]}
  
};
