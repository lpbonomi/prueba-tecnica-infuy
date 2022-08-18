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

export function enciptarClave(clave) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(clave),
    process.env.REACT_APP_ENCRYPTION_KEY
  ).toString();
}

export function desencriptarClave(clave_encriptada) {
  var bytes = CryptoJS.AES.decrypt(
    clave_encriptada,
    process.env.REACT_APP_ENCRYPTION_KEY
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
