const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

var usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "No puede estar vacío"],
    match: [/\S+@\S+\.\S+/, "No es válido"],
    index: true,
  },
  contraseña: {
    type: String,
    lowercase: false,
    unique: false,
    required: [true, "No puede estar vacío"],
    index: true,
  },
  nombre: {
    type: String,
    lowercase: false,
    unique: false,
    required: [true, "No puede estar vacío"],
    match: [/^[a-zA-Z0-9]+$/, "No es válido"],
    index: true,
  },
  clave: {
    type: String,
    lowercase: false,
    unique: false,
    required: false,
    index: false,
  },
});

usuarioSchema.methods.generarJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    process.env.JWT_SECRET
  );
};

usuarioSchema.methods.aAuthJSON = function () {
  return {
    id: this._id,
    email: this.email,
    nombre: this.nombre,
    clave: this.clave,
    token: this.generarJWT(),
  };
};

module.exports = mongoose.model("Usuario", usuarioSchema);
