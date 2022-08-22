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

const nonceState = {};

export function nonceReducer(state = nonceState, action) {
  const { type, payload } = action;

  if (type === "nonce/save") {
    const { network, nonce } = payload;
    state[network] = nonce;
    return state;
  }

  if (type === "nonce/delete") {
    return {
      ...state,
      nonces: null,
    };
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
    state[chainId].push({
      address: address,
      symbol: symbol,
      decimals: decimals,
    });
    return state;
  }

  return state;
}

export function getTokens(state, network) {
  try {
    return state.tokenReducer[network];
  } catch {
    return null;
  }
}
