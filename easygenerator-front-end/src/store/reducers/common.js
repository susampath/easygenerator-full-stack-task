import { createSlice } from "@reduxjs/toolkit";

import reducerTypes from "../reducerTypes";

const initialState = {
  toastAlerts: [],
};

export const commonSlice = createSlice({
  name: reducerTypes.common,
  initialState,
  reducers: {
    /* -------------------------------------------------------------------------- */
    /*                                 Toast alert                                */
    /* -------------------------------------------------------------------------- */
    SHOW_TOAST_ALERT: (state, data) => {
      state.toastAlerts = [...state.toastAlerts, data.payload];
    },
    HIDE_TOAST_ALERT: (state, data) => {
      state.toastAlerts = state.toastAlerts.filter(
        (alert) => alert.id !== data.payload
      );
    },
  },
});

export const { SHOW_TOAST_ALERT, HIDE_TOAST_ALERT } = commonSlice.actions;

export default commonSlice.reducer;
