var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");
var Usuario = mongoose.model("Usuario");
const usuario = require("../models/usuario");

// GET USUARIO
router.get("/", (req, res, next) => {
  Usuario.findById(req.query.id)
    .then((usuario) => {
      if (!usuario) {
        return res.sendStatus(401);
      }

      return res.json({ usuario: usuario.aAuthJSON() });
    })
    .catch((error) => {
      console.log(error);
    });
});

// LOGIN
router.post("/login", (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "No puede estar vacío" } });
  }

  if (!req.body.contraseña) {
    return res
      .status(422)
      .json({ errors: { contraseña: "No puede estar vacío" } });
  }

  passport.authenticate(
    "local",
    { session: false },
    async (err, usuario, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      if (usuario) {
        usuario = await usuario;
        usuario.token = usuario.generarJWT();
        return res.json({ usuario: usuario.aAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
});

// CREAR USUARIO
router.post("/", (req, res, next) => {
  var usuario = new Usuario();

  usuario.email = req.body.email;
  usuario.contraseña = req.body.contraseña;
  usuario.nombre = req.body.nombre;

  usuario
    .save()
    .then(() => {
      return res.json({ usuario: usuario.aAuthJSON() });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
