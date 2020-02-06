const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const passport = require("passport");

const {database} = require("./keys");

const cors = require("cors");

// initializations
const app = express();
require("./lib/passport");
app.use(cors());

// settings
app.set("port", process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middlewares
app.use(session({
  secret: "usermysqlnodesession",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database) 
}))
app.use(flash());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
});

// Routes
// app.use(require("./routes/"));
app.use("/links", require("./routes/authentication"));
app.use("/links", require("./routes/links"));

// Public
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../public")));

  // Handle SPA
  app.get(/.*/, function(req, res) {
    res.sendFile(__dirname + "../public/index.html");
  });
}

// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
