const express = require("express");
const router = express.Router();

const passport = require("passport");

router.post("/login", function(req, res, next) {
  passport.authenticate("local.signin", function(err, user, info) {
    if (err) {
      console.log(err); // will generate a 500 error
      console.log(user);
      return res.send({ success: false, message: err });
    } else {
      console.log(user);
      console.log("auth " + req.isAuthenticated());
      return res.send({
        success: true,
        message:
          "Acceso concedido.",
          user
      });
    }
  })(req, res, next);
});

router.post("/newUser", function(req, res, next) {
  passport.authenticate("local.signup", function(err, user, info) {
    if (err) {
      console.log(err); // will generate a 500 error
      return res.send({ success: true, message: "El correo ya existe." });
    } else {
      return res.send({
        success: true,
        message:
          "Su solicitud fue enviada, espere hasta que el administrador le habilite el acceso."
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  console.log(user);
  // req.logOut();
  // console.log(user);
  // res.send("logout");
})

module.exports = router;
