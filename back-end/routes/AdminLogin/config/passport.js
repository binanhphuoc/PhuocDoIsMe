const JwtStrategy = require('passport-jwt').Strategy

const ExtractJwt = require('passport-jwt').ExtractJwt

// load up the user model
const User = require('../../../Models/User')
const settings = require('../config/settings') // get settings file

module.exports = (passport) => {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = settings.secret
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({
      _id: jwt_payload._id
    }, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
