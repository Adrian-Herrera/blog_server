const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("../lib/helpers");

passport.use(
  "local.signin",
  new LocalStrategy({
    usernameField: "mail",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, mail, password, done) => {
    // console.log(req.body);
    const rows = await pool.query("SELECT * FROM users WHERE Mail = ?", [mail]);
    if (rows.length > 0) {
      const user = rows[0];
      // console.log(user);
      const validPassword = await helpers.matchPassword(password, user.Password)
      // console.log(validPassword);
      if (validPassword){
        done(null, user)
      } else {
        done("Contraseña incorrecta")
      }
    } else {
      return done("El correo no existe")
    }
  })
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      // console.log(req.body);
      const { mail } = req.body;
      const newUser = {
        username,
        password,
        mail
      };
      newUser.password = await helpers.encryptPassword(password);
      const verify = await pool.query("SELECT * FROM users WHERE Mail = ?", [
        newUser.mail
      ]);
      if (verify[0]) {
        // console.log("Existe");
        let msg = "existe";
        return done(msg);
      } else {
        const result = await pool.query("INSERT INTO users SET ?", [newUser]);
        newUser.id = result.insertId;
        return done(null, newUser);
      }
      // console.log(result);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE Id_usr = ?", [id]);
  done(null, rows[0]);
});
