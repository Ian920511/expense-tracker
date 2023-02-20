const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session);

  passport.use(
    new LocalStrategy(
      { usernameField: "account", passReqToCallback: true },
      (req, account, password, done) => {
        User.findOne({ account })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash("warning_msg", "此帳號未註冊!")
              );
            }

            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                return done(
                  null,
                  false,
                  req.flash("warning_msg", "帳號或密碼不符!")
                );
              }

              return done(null, user);
            });
          })
          .catch((error) => console.log(error));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    User.findById(_id)
      .lean()
      .then((user) => {
        done(null, user);
      })
      .catch((error) => console.log(error));
  });
};
