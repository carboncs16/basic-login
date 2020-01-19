const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail, getUserById) {
    authenticateUser = (email, password, done) => {
        getUserByEmail(email)
            .then(user => {
                if (user === null) {                    
                    return done(null, false, { message: 'No user found' });
                }
                if (user && password !== user.password) {
                    return done(null, false, { message: 'Password incorrect' });
                } else {
                    return done(null, user);
                }
            });
    }

    passport.use(new LocalStrategy({ usernameField: 'email' },
        authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((user, done) => {
        done(null, getUserById())
    });
}

module.exports = initialize