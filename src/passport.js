const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

//jwt token strategy 
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        //find the user specified in token
        const user = await User.findById(payload.sub);

        //if user does not exist handle it
        if(!user) {
            return done(null, false);
        }

        //otherwise return user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
} ));

export default passport;
