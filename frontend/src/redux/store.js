import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { jwtReducer } from "../reducers/auth";

const persistConfig = {
  key: process.env.REACT_APP_REDUX_KEY,
  storage,
};

const persistedReducer = persistReducer(persistConfig, jwtReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
