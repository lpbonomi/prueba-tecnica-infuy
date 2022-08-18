const initialState = {
    jwt_token: null
  }

export function jwtReducer(state = initialState, action) {
    const { type, payload } = action;

    if(type == 'jwt/save'){
        return {
            ...state,
            jwt_token: payload,
          };
    }

    if(type == 'jwt/delete'){
      return {
        ...state,
        jwt_token: null,
      };
    }

    return state;
}