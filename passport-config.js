const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const initilize = (passport, getUserByEmail, getUserById) => {
  
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user === null) {
      return done(null, false, { message: "No user with that email found" });
    }

    try {
        console.log(user)
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
};

module.exports = initilize;
