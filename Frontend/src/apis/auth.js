import { post, get } from "../libs/api/apiWrapper";
import APIs from "../helpers/apiRoutes";

/**
 * Login user by sending a POST request with user credentials.
 * @param {object} payload - User credentials for login.
 * @returns {Promise} Successful login or rejects with an error.
 */
const loginUser = async (payload) => {
  try {
    const response = await post(APIs.AUTH.LOGIN, payload, {
      detachAccessToken: true,
    });
    return response.data;
  } catch (e) {
    console.log("login user error", e);
    throw e;
  }
};

/**
 * Register a new user by sending a POST request with user registration data.
 * @param {object} payload - User registration data.
 * @returns {Promise} Successful registration or rejects with an error.
 */
const registerUser = async (payload) => {
  try {
    const response = await post(APIs.AUTH.REGISTER, payload, {
      detachAccessToken: true,
    });
    return response.data;
  } catch (e) {
    console.log("register user error", e);
    throw e;
  }
};

/**
 * Register a new user by sending a POST request with user registration data.
 * @returns {Promise} Successful registration or rejects with an error.
 */
const getUserDetails = async () => {
  try {
    const response = await get(APIs.AUTH.USER_DETAILS);
    return response.data;
  } catch (e) {
    console.log("register user error", e);
    throw e;
  }
};

export { loginUser, registerUser, getUserDetails };
