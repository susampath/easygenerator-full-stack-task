import { BACKEND_API_BASE_URL } from "../config/config";

export default Object.freeze({
  AUTH: {
    LOGIN: `${BACKEND_API_BASE_URL}/auth/login`,
    REGISTER: `${BACKEND_API_BASE_URL}/auth/register`,
    USER_DETAILS: `${BACKEND_API_BASE_URL}/auth/user-details`,
  },
});
