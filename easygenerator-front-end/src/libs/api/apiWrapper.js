import * as APIConnector from "./apiConnector";

export const get = (url, config = {}) => APIConnector.get(url, config);
export const post = (url, body, config = {}) =>
  APIConnector.post(url, body, config);
