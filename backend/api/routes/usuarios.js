var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");
var Usuario = mongoose.model("Usuario");
const usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const Token = mongoose.model("Token");
const Schema = mongoose.Schema;

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, usuario, info) => {
    try {
      if (err || !usuario) {
        console.log(err);
        const error = new Error(
          "Ocurrió un error al intentar loguear al usuario"
        );

        return next(error);
      }

      req.login(usuario, { session: false }, async (error) => {
        if (error) {
          console.log(error);
          return next(error);
        }

        const tokens = await Token.find({
          usuario_id: mongoose.Types.ObjectId(usuario._id),
        })
          .all()
          .exec();

        const body = {
          _id: usuario._id,
          email: usuario.email,
          clave: usuario.clave,
          tokens: tokens,
        };

        const token = jwt.sign({ usuario: body }, process.env.JWT_SECRET);

        return res.json({ jwt_token: token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

//LOGOUT
router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send({ message: "Deslogueado" });
  });
});

// CREAR USUARIO
router.post(
  "/",
  passport.authenticate("registro", { session: false }),
  async (req, res, next) => {
    res.status(201).json({ message: "Registrado con éxito." });
  }
);

// GUARDAR CLAVE
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    var user = req.user;

    var usuario = await Usuario.findOne({ email: user.email }).exec();
    // TODO clave required
    usuario.clave = req.body.usuario.clave;

    usuario
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Clave actualizada con éxito." });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
