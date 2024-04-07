import reducerTypes from "../reducerTypes";

export const isTokenExpired = (state) =>
  state[reducerTypes.auth].isTokenExpired;
