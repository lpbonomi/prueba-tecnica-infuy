import { PURGE } from "redux-persist";

const clavePrivadaState = { clave_privada: null };

export function clavePrivadaReducer(state = clavePrivadaState, action) {
  const { type, payload } = action;

  if (type === "clave_privada/save") {
    return {
      ...state,
      clave_privada: payload,
    };
  }

  if (type === PURGE) {
    return clavePrivadaState;
  }

  return state;
}

export function getClavePrivada(state) {
  return state.clavePrivadaReducer.clave_privada;
}

const nonceState = {};

export function nonceReducer(state = nonceState, action) {
  const { type, payload } = action;

  if (type === "nonce/save") {
    const { network, nonce } = payload;

    return { ...state, [network]: nonce };
  }

  if (type === PURGE) {
    return nonceState;
  }

  return state;
}

export function getNonce(state, network) {
  try {
    return state.nonceReducer[network];
  } catch {
    return null;
  }
}

const tokensState = {};

export function tokenReducer(state = tokensState, action) {
  const { type, payload } = action;

  if (type === "tokens/save") {
    const { chainId, address, symbol, decimals } = payload;

    if (!(chainId in state)) {
      state[chainId] = [];
    }
    const new_element = {
      address: address,
      symbol: symbol,
      decimals: decimals,
    };

    const aux = state[chainId];
    aux.push(new_element);
    return { ...state, aux };
  }

  if (type === PURGE) {
    return tokensState;
  }

  return state;
}

export function getTokens(state, network) {
  return state.tokenReducer[network] ? state.tokenReducer[network] : [];
}
