const bcrypt = require("bcrypt");
const models = require("../collections/Users");
const { User } = models;

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;

    User.find({ username: username }).then(user => {
      console.log(`this is the user`, user);

      bcrypt
        .compare(password, user[0].password)
        .then(matchingPassword => {
          if (matchingPassword) {
            req.session.user = {
              username: user[0].username,
              email: user[0].email,
              id: user[0]._id,
              listings: user[0].listings
            }; //console.log(user) this might be an error
            res.status(200).send(req.session.user);
            console.log(req.session.user); //! delete console.log later***
          } else {
            res.status(200).send({ message: `Incorrect password. Try again!` }); // change this to "wrong username or password" once it is working
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  register: (req, res) => {
    const { username, password, email } = req.body;
    const saltRounds = 12;
    bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        bcrypt
          .hash(password, salt)
          .then(hashedPassword => {
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
                // .catch(err => {
                //   console.log(err)
                // })
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
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },

  logout: async (req, res) => {
    await req.session.destroy();
    res.status(200).send("user logged out, userSession destroyed");
  },

  userSession: (req, res) => {
    res.status(200).send(req.session.user);
  },

  editProfile: (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    User.findById(id).then(foundUser => {
      console.log("req.params", req.params);
      console.log(foundUser.email, email);
      foundUser.email = email;

      foundUser.save(err => {
        req.session.user = {
          username: foundUser.username,
          email: foundUser.email,
          id: foundUser._id,
          listings: foundUser.listings
        };
        res.status(200).send(req.session.user);
      });
    });
  },

  deleteProfile: (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id).then(userDeletionInfo => {
      console.log("userDeletionInfo", userDeletionInfo);
      User.find()
        .then(users => {
          res.status(200).send(users);
        })
        .catch(err => console.log(err));
    });
  }
};
