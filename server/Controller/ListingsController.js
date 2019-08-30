const models = require("../collections/Users");
const { User, Listing } = models;

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
        currentUser.listings.splice(index, 1);
        console.log("User: " + currentUser.username + "deleted a listing");
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
  }
};
