const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var tokenSchema = new mongoose.Schema({
  address: {
    type: String,
    index: true,
    minLength: 42,
    maxLength: 42,
  },
  symbol: {
    type: String,
    maxLength: 11,
    required: [true, "No puede estar vacío"],
    index: true,
  },
  decimals: {
    type: Number,
    required: [true, "No puede estar vacío"],
  },
  chain_id: {
    type: Number,
    unique: true,
    required: [true, "No puede estar vacío"],
  },
  usuario_id: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

module.exports = mongoose.model("Token", tokenSchema);
