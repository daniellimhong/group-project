const bcrypt = require('bcrypt');
const users = require('../collections/Users');

module.exports = {
    login: (req, res) => {
        const { userName, password } = req.body;

        users.find({ userName: userName})
        .then( user => {
            bcrypt
            .compare(password, user[0].password)
            .then(matchingPassword => {
                if(matchingPassword){
                    req.session.user = user[0].username //console.log(user) this might be an error
                    res.status(200).send(req.session.user)
                } else {
                    res.status(401).send("wrong password") // change this to "wrong username or password" once it is working
                }
            })
        }).catch(err => {
            console.log(err)
        })
    },

    register: (req, res) => {
        const { userName, password, email } = req.body;
        const saltRounds = 12
        bcrypt.genSalt(saltRounds).then(salt => {
            bcrypt.hash(typedPassword, salt).then(hashedPassword => {
                const user = new User({
                    username: userName,
                    password: password,
                    email: email
                });
                user.save(err => {
                    if (err) {
                        res.status(400).send("the server did not save the information", console.log(err))
                    }
                users.find({ email: email }).then(user => {
                    req.session.user = user[0].username;
                    res.status(200).send(req.session.user)
                })
                })
            })
        })
    },

    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send([])
    },

    userSession: (req, res) => {
        res.status(200).send(req.session.user)
    }
}