import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  Persistor,
  PersistConfig,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

interface UserState {
  loggedIn: boolean;
}

const initialState: UserState = {
  loggedIn: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action) {
      state.loggedIn = action.payload;
    },
    logOut(state) {
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = user.actions;

const persistConfig: PersistConfig<UserState> = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, user.reducer);

const rootReducer = combineReducers({
  user: persistedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor: Persistor = persistStore(store);

export default store;
