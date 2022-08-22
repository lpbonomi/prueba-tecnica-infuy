import { PURGE } from "redux-persist";

const jwtState = { jwt_token: null };

export function jwtReducer(state = jwtState, action) {
  const { type, payload } = action;

  if (type === "jwt/save") {
    return {
      ...state,
      jwt_token: payload,
    };
  }

  if (type === PURGE) {
    return jwtState;
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

  if (type === PURGE) {
    return contraseñaState;
  }

  return state;
}

export function getContraseña(state) {
  return state.contraseñaReducer.contraseña;
}
