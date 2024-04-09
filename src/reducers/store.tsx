import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const user = createSlice({
  name: "user",
  initialState: false,
  reducers: {
    logIn(state, action) {
      return action.payload;
    },
    logOut() {
      return false;
    },
  },
});

export const { logIn, logOut } = user.actions;

const persistConfig = {
  key: "root",
  storage,
  serialization: false,
};

const persistedReducer = persistReducer(persistConfig, user.reducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
