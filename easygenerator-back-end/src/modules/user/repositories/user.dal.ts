import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";

import {IUser} from "../../../schemas/interfaces/user.interface";
import {RegisterDTO} from "../../auth/dtos/register";
import {Users} from "../../../schemas/user.schema";

@Injectable()
export class UserDal {
    constructor(@InjectModel(Users.name) private userModel: Model<IUser>) {}

    /**
     * Asynchronously creates a new user using the provided payload.
     * @param {RegisterDTO} userPayload The payload containing user information for registration.
     * @returns {Promise<IUser>} A promise that resolves with the newly created user.
     */
    async create(userPayload: RegisterDTO): Promise<IUser> {
        const newUser = new this.userModel(userPayload);
        return newUser.save();
    }

    /**
     * Finds a single document in the database based on the provided query.
     * @async
     * @param {import("mongoose").FilterQuery<IUser>} payload - The query used to find the document.
     * @returns {Promise<IUser>} A promise that resolves to the found document or null if not found.
     */
    async findOne(payload: FilterQuery<IUser>): Promise<IUser> {
        return this.userModel.findOne(payload).exec();
    }
}
