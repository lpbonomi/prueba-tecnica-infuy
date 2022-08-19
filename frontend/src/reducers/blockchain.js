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
