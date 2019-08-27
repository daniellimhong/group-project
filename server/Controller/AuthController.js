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
        const { userName, email, password } = req.body;
        const saltRounds = 12
        bcrypt.genSalt(saltRounds).then(salt => {
            bcrypt.hash(typedPassword, salt).then(hashedPassword => {
                const user = new User({
                    
                })
            })
        })
    }
}