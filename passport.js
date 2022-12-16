const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('./models/user');

require('dotenv').config();

passport.use(
    new LocalStrategy(
        { usernameField: 'username', passwordField: 'password'},
        async (username, password, done) => {
            try {
                User.findOne({ username: username}, (err, user) => {
                    if (err) return done(err);
    
                    if (!user) return done(null, false, { message: 'User not found.'});
    
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) return done(err);
    
                        if (isMatch) return done(null, user);
    
                        else return done(null, false, { message: 'Incorrect username or password!!!' });
                    });
                });
            } catch (error) {
                return done(error);
            }
        } 
    )
)

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETKEY,
    }, 
    async (jwtPayload, done) => {
        try {
            return done(null, jwtPayload.user);
        } catch (err) {
            done(err);
        }
    }
));