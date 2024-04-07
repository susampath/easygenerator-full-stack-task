/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import reducerTypes from "../reducerTypes";

const initialState = {
  id: null,
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: reducerTypes.user,
  initialState,
  reducers: {
    SET_DATA: (state, data) => {
      state.id = data.payload.id;
      state.name = data.payload.name;
      state.email = data.payload.email;
    },
    RESET: (state, data) => initialState,
  },
});

export const { SET_DATA, RESET } = userSlice.actions;

export default userSlice.reducer;
