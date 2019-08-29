const bcrypt = require("bcrypt");
const models = require("../collections/Users");
const { User } = models;

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;

    User.find({ username: username }).then(user => {
      bcrypt.compare(password, user[0].password).then(matchingPassword => {
        if (matchingPassword) {
          req.session.user = {
            username: user[0].username,
            email: user[0].email,
            id: user[0]._id,
            listings: user[0].listings
          }; //console.log(user) this might be an error
          res.status(200).send(req.session.user);
          //   console.log(req.session.user) //! delete console.log later***
        } else {
          res.status(200).send({message: `Incorrect password. Try again!`}); // change this to "wrong username or password" once it is working
        }
      });
    });
    //   .catch(err => {
    //     console.log(err);
    //   });
  },

  register: (req, res) => {
    const { username, password, email } = req.body;
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds).then(salt => {
      bcrypt.hash(password, salt).then(hashedPassword => {
        const user = new User({
          username: username,
          password: hashedPassword,
          email: email
        });
        user.save(err => {
          if (err) {
            res.status(401).send({
              message: "That username or Email is already registered"
            });
          }

          User.find({ email: email }).then(user => {
            console.log(user[0]);
            req.session.user = {
              username: user[0].username,
              email: user[0].email
            };
            res.status(200).send(req.session.user);
          });
        });
      });
    });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send("user logged out, userSession destroyed");
  },

  userSession: (req, res) => {
    res.status(200).send(req.session.user);
  },

  editProfile: (req, res) => {
    const { id } = req.params;
    const { email } = req.query;

    User.findById(id).then(foundUser => {
      console.log("req.params", req.params);
      foundUser.email = email;
      foundUser.save(err => {
        User.find().then(users => {
          res.status(200).send(users);
        });
      });
    });
  },

  deleteProfile: (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id).then(userDeletionInfo => {
      console.log("userDeletionInfo", userDeletionInfo);
      User.find().then(users => {
        res.status(200).send(users);
      });
    });
  }
};
