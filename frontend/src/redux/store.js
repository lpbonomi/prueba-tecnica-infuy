import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { jwtReducer, contraseñaReducer } from "../reducers/auth";
import {
  nonceReducer,
  clavePrivadaReducer,
  tokenReducer,
} from "../reducers/blockchain";
import { combineReducers } from "redux";

const persistConfig = {
  key: process.env.REACT_APP_REDUX_KEY,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    jwtReducer,
    contraseñaReducer,
    clavePrivadaReducer,
    nonceReducer,
    tokenReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
