import { utils, ethers } from "ethers";

var CryptoJS = require("crypto-js");

export function hashearContraseña(contraseña) {
  return utils.keccak256(utils.toUtf8Bytes(contraseña));
}

export function esClaveValida(clave) {
  try {
    new ethers.Wallet(clave);
  } catch {
    return false;
  }
  return true;
}

export function enciptarString(valor, clave_encriptacion) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(valor),
    clave_encriptacion
  ).toString();
}

export function desencriptarString(valor_encriptado, clave_encriptacion) {
  var bytes = CryptoJS.AES.decrypt(valor_encriptado, clave_encriptacion);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function getPublicAddress(clave) {
  const wallet = new ethers.Wallet(clave);
  return wallet.address;
}
