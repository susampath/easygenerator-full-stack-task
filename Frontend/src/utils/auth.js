import localStorageHelper from "../helpers/localStorage";
import {
  getSingleData,
  hasData,
  removeSingleData,
  setSingleData,
} from "../libs/localStorageWrapper";

const hasAuthToken = () => hasData(localStorageHelper.AUTH.ACCESS_TOKEN);
const getAccessToken = () =>
  getSingleData(localStorageHelper.AUTH.ACCESS_TOKEN);

const setAccessToken = (token) =>
  setSingleData(localStorageHelper.AUTH.ACCESS_TOKEN, token);

const deleteAccessToken = () =>
  removeSingleData(localStorageHelper.AUTH.ACCESS_TOKEN);

const hasAuthTokens = () => hasAuthToken();

export { hasAuthTokens, getAccessToken, setAccessToken, deleteAccessToken };
