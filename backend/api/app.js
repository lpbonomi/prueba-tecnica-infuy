require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect(process.env.MONGODB_URI);

var Usuario = require("./models/usuario");

var usuariosRouter = require("./routes/usuarios");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    // Se debería utilizar una clave aleatoria guardada en un archivo .env
    secret: "1273812628162",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
    },
    function verify(email, contraseña, cb) {
      const usuario = Usuario.findOne({
        email: email,
        contraseña: contraseña,
      }).exec();
      if (!usuario) {
        return cb(null, false, {
          message: "Email o Contraseña no válidos",
        });
      }
      return cb(null, usuario);
    }
  )
);
// passport.serializeUser(Usuario.serializeUser());
// passport.deserializeUser(Usuario.deserializeUser());

app.use("/usuarios", usuariosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
