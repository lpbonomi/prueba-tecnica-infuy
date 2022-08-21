var mongoose = require("mongoose");
var Token = mongoose.model("Token");
const token = require("../models/token");
var router = require("express").Router();
var passport = require("passport");

router.post(
  "/agregar",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    var usuario = req.user;

    var token = new Token();

    token.address = req.body.token.address;
    token.symbol = req.body.token.symbol;
    token.decimals = req.body.token.decimals;
    token.chain_id = req.body.token.chainId;

    token.usuario_id = usuario._id;

    token
      .save()
      .then(() => {
        return res.status(201).json({ message: "Token creado con éxito." });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
