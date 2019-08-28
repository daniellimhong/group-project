const bcrypt = require("bcrypt");
const users = require("../collections/Users");

module.exports = {
  login: (req, res) => {
    const { userName, password } = req.body;

    users.find({ username: userName }).then(user => {
      bcrypt.compare(password, user[0].password).then(matchingPassword => {
        if (matchingPassword) {
          req.session.user = {
              username: user[0].username,
              email: user[0].email
            }; //console.log(user) this might be an error
          res.status(200).send(req.session.user);
        } else {
          res.status(401).send("wrong password"); // change this to "wrong username or password" once it is working
        }
      });
    });
    //   .catch(err => {
    //     console.log(err);
    //   });
  },

  register: (req, res) => {
    const { userName, password, email } = req.body;
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds).then(salt => {
      bcrypt.hash(password, salt).then(hashedPassword => {
        const user = new users({
          username: userName,
          password: hashedPassword,
          email: email
        });
        user.save(err => {
          if (err) {
            res.status(401).send({
              message: "That username or Email is already registered"
            });
          }

          users.find({ email: email }).then(user => {
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
    res.status(200).send('user logged out, userSession destroyed');
  },

  userSession: (req, res) => {
    res.status(200).send(req.session.user);
  }
};
