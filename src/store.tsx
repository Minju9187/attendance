import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    logIn(state, action) {
      return action.payload;
    },
    logOut() {
      return null;
    },
  },
});

export const { logIn, logOut } = user.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
  },
});
