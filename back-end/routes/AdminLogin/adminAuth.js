const mongoose = require('mongoose')
const passport = require('passport')
const settings = require('./config/settings')
require('./config/passport')(passport)
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../../Models/User')
const crypto = require('crypto')
const moment = require('moment')

// routers to authenticate user

router.get('/auth',
  passport.authenticate('jwt', { session: false}), 
  function (req, res, next) {
    var token = getToken(req.headers)
    if (token) {
        return res.json({success:false, msg: 'Authorized.'});
    } else {
      return res.status(401).json({success: false, msg: 'Unauthorized.'});
    }
})
getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}
// routers for sign up or register new user
router.post('/register', function (req, res) {
  if (!req.body.username || !req.body.password || !req.body.userType) {
    res.json({success: false, msg: 'Please pass username, password, and userType'})
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      userType: req.body.userType
    })
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.status(409).json({success: false, msg: 'Username already exists.'})
      }
      res.json({success: true, msg: 'Successful created new user.'})
    })
  }
})
// router for login or sign-in.
router.post('/login', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.status(401).json({success: false, msg: 'Authentication failed. User not found.'})
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          // New object to sign
          // var signUser = {
          //   email: ,
          //   ObjectID: ,
          // }

          var token = jwt.sign(user.toJSON(), settings.secret)
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token})
        } else {
          res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'})
        }
      })
    }
  })
})

// router for Reset Password
router.post('/resetPassword', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.status(401).json({success: false, msg: 'User not found.'})
    } else {
      res.json({success: true})
      // generate random token for reset Password
      const buf = crypto.randomBytes(20)
      var token = buf.toString('hex')
      user.resetPasswordToken = token
      user.resetPasswordExpires = moment(1, 'hour').fromNow() // link expire in 1 hour
      user.save(function (err) {
      })

      // NOT FINISHED: Make request to Emailer API to send Email (need to use NodeEmailer)
      const email = user.username
      const subject = 'Docport Reset Password'
      const template = 'passwordReset-docport'
      const data = {
        'username': user.username,
        'url': 'http://' + process.env.HOST + ':3000/api/auth/reset/' + token
      }
    }
  })
})
// router to change password page
router.get('/reset/:token', function (req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
    if (!user) {
      // req.flash('error', 'Password reset token is invalid or has expired.');
      // return res.redirect('/reset-password');
    }
    res.render('reset', {
      user: req.user
    })
  })
})
router.post('/reset/:token', function (req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
    if (!user) {
      // req.flash('error', 'Password reset token is invalid or has expired.');
      // return res.redirect('/reset-password');
      console.log(req.params.token)
      return res.status(401).json({success: false, msg: 'Password reset token is invalid or has expired'})
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    user.save(function (err) {
    })
    res.json({success: true, msg: 'Password has been reset'})
  })
})
// Export the router constiable as a module.
module.exports = router
