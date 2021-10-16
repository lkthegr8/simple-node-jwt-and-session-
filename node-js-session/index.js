var express = require("express");
var session = require("express-session");

var app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 },
  })
);

app.use(function (req, res, next) {
  if (!req.session.login) {
    req.session.login = "not logged in";
  }

  next();
});

app.get("/loggedin", function (req, res, next) {
  res.send(req.session.login);
});
app.get("/login", function (req, res, next) {
  req.session.login = "now you are logged in successfully";
  res.send(req.session.login);
});
app.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.send(req.session.login);
});

app.listen(5000, () => {
  console.log("listening at port 5000");
});
