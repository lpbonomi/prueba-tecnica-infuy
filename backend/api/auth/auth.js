const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var Usuario = require("../models/usuario");

// REGISTRO
passport.use(
  "registro",
  new localStrategy(
    {
      usernameField: "usuario[email]",
      passwordField: "usuario[contraseña]",
      passReqToCallback: true,
    },
    async (req, email, contraseña, done) => {
      await Usuario.create({
        email: email,
        contraseña: contraseña,
        nombre: req.body.usuario.nombre,
      })
        .then((usuario) => {
          return done(null, usuario);
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    }
  )
);

// LOGIN
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "usuario[email]",
      passwordField: "usuario[contraseña]",
    },
    async (email, contraseña, done) => {
      try {
        const usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
          return done(null, false, {
            message: "Usuario o contraseña incorreta.",
          });
        }

        if (usuario.contraseña != contraseña) {
          return done(null, false, {
            message: "Usuario o contraseña incorreta.",
          });
        }

        return done(null, usuario, { message: "Logueado exitosamente." });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

// AUTH JWT
passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_token, done) => {
      try {
        return done(null, jwt_token.usuario);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
