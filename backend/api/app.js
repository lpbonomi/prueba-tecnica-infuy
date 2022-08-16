require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var cors = require("cors");

mongoose.connect(process.env.MONGODB_URI);

var Usuario = require("./models/usuario");

var usuariosRouter = require("./routes/usuarios");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    Usuario.findOne({ id: jwt_payload.sub }, function (err, usuario) {
      if (err) {
        return done(err, false);
      }

      if (!usuario) {
        return done(null, false);
      }

      return done(null, usuario);
    });
  })
);

app.use("/usuarios", usuariosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
