/* eslint-disable react/forbid-foreign-prop-types */
import { queryByAttribute } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../store/rootReducer";

export const getByTestId = queryByAttribute.bind(null, "data-testid");

/**
 * Create a testing store with imported reducers, middleware and initial state.
 * @function storeFactory
 * @param {object} initialState - Initial state for store.
 * @returns {Store} - Redux store.
 */
export const storeFactory = (initialState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
