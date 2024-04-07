import {Injectable} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import {UserDal} from "../repositories/user.dal";
import {RegisterDTO} from "../../auth/dtos/register";
import {IUser} from "../../../schemas/interfaces/user.interface";
import {WinstonService} from "../../../utils/logger/winston/winston.service";

@Injectable()
export class UserService {
    constructor(
        private readonly userDal: UserDal,
        private readonly logger: WinstonService
    ) {}

    /**
     * Creates a new user with the provided user data.
     * @async
     * @param {RegisterDTO} userData - The user data to create a new user.
     * @returns {Promise<IUser>} A Promise that resolves with the created user object.
     * @throws {Error} If an error occurs during user creation.
     */
    async createUser(userData : RegisterDTO): Promise<IUser>{
        try{
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            return await this.userDal.create({
                name: userData.name,
                password: hashedPassword,
                email: userData.email
            });
        }
        catch (error) {
            this.logger.error(`${UserService.name} : `,error);
            throw error;
        }
    }

    /**
     * Finds a user by email address.
     * @param {string} email - The email address of the user to find.
     * @returns {Promise<IUser>} A promise that resolves to the user object if found.
     * @throws {Error} If an error occurs during the process.
     */
    async findUserByEmail(email:string) :Promise<IUser>{
        try{
            return await this.userDal.findOne({email});
        }
        catch (error) {
            this.logger.error(`${UserService.name} : `,error);
            throw error;
        }
    }

}
