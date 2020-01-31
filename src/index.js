const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");

const cors = require("cors");

// initializations
const app = express();
app.use(cors());

// settings
app.set("port", process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middlewares
app.use(morgan("dev"));


// Global Variables
app.use((req, res, next) => {
  next();
});

// Routes
app.use(require("./routes/"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));

// Public
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
