const jwtState = { jwt_token: null };

export function jwtReducer(state = jwtState, action) {
  const { type, payload } = action;

  if (type === "jwt/save") {
    return {
      ...state,
      jwt_token: payload,
    };
  }

  if (type === "jwt/delete") {
    return {
      ...state,
      jwt_token: null,
    };
  }

  return state;
}

export function getJwt(state) {
  return state.jwtReducer.jwt_token;
}

const contraseñaState = { contraseña: null };

export function contraseñaReducer(state = contraseñaState, action) {
  const { type, payload } = action;

  if (type === "contraseña/save") {
    return {
      ...state,
      contraseña: payload,
    };
  }

  if (type === "contraseña/delete") {
    return {
      ...state,
      contraseña: null,
    };
  }

  return state;
}

export function getContraseña(state) {
  return state.contraseñaReducer.contraseña;
}

const clavePrivadaState = { clave_privada: null };

export function clavePrivadaReducer(state = clavePrivadaState, action) {
  const { type, payload } = action;

  if (type === "clave_privada/save") {
    return {
      ...state,
      clave_privada: payload,
    };
  }

  if (type === "clave_privada/delete") {
    return {
      ...state,
      clave_privada: null,
    };
  }

  return state;
}

export function getClavePrivada(state) {
  return state.clavePrivadaReducer.clave_privada;
}
