import {IUser} from "../schemas/interfaces/user.interface";

/**
 * Sanitizes a user object by removing sensitive information such as password.
 * @param {IUser} user - The user object to sanitize.
 * @returns  - The sanitized user object.
 */
export const sanitizeUser = (user: IUser) => {
    const sanitized = user.toObject();
    delete sanitized["password"];
    return sanitized;
};
