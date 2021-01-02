const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    console.log("ddd",req.body);
    var user = new User();
    user.name = req.body.name;
    user.gender = req.body.gender;
    user.mobileNumber = req.body.mobileNumber;
    user.designation = req.body.designation;
    user.emailId = req.body.emailId;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Email already exists.']);
            else
                return next(err);
        }

    });
}
 
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {       
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ emailId: req.body.emailid },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user });
        }
    );

}

module.exports.getAllusers = (req, res) => {
    User.find(function (err, users) {
        if (err) return console.error(err);   
        res.send(users);
    })
}

module.exports.delete = (req, res, next) =>{
    User.remove({ _id: req.body.id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user });
        }
    );

}
