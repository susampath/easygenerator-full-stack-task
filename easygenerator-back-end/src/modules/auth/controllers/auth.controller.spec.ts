import {Test, TestingModule} from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";

import {AuthController} from "./auth.controller";
import {MainService} from "../../../utils/responseHandler/main.service";
import {mockRequest, mockResponse} from "../../../helpers/unit-tests/unit-test-mock-helper";
import {AuthService} from "../services/auth.service";
import {UserService} from "../../user/services/user.service";
import {registerUserResponse} from "../../../tests/references/controllers/auth.controller";
import {ResponseCode} from "../../../constants/response.codes";
import {ResponseMessages} from "../../../constants/response.messages";
import {JwtService} from "@nestjs/jwt";
import {UserDal} from "../../user/repositories/user.dal";

import {Users, UserSchema} from "../../../schemas/user.schema";
import {WinstonService} from "../../../utils/logger/winston/winston.service";

jest.mock("../../user/services/user.service");
jest.mock("../services/auth.service");

beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
});


describe("AuthController", () => {
    let controller: AuthController;
    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;
    let userModel: Model<Users>;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoConnection = (await connect(uri)).connection;
        userModel = mongoConnection.model(Users.name, UserSchema);
        const app: TestingModule = await Test.createTestingModule({
            controllers:[AuthController],
            providers: [
                AuthService,
                UserService,
                JwtService,
                UserDal,
                MainService,
                WinstonService,
                {provide: getModelToken(Users.name), useValue: userModel},
            ],
        }).compile();
        controller = app.get<AuthController>(AuthController);
    });

    afterAll(async () => {
        await mongoConnection.dropDatabase();
        await mongoConnection.close();
        await mongod.stop();
    });

    afterEach(async () => {
        const collections = mongoConnection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("register", () => {
        const res = mockResponse();
        const requestBody = {email: "test@example.com", password: "1234!64A", name: "Test User"};

        it("should register a new user when user with given email doesn't exist", async () => {
            (UserService.prototype.findUserByEmail as jest.Mock).mockResolvedValueOnce(null);
            (AuthService.prototype.registerUser as jest.Mock).mockResolvedValueOnce(registerUserResponse);

            await controller.register(requestBody, res);

            expect(res.send).toHaveBeenCalledWith({
                code: ResponseCode.SUCCESS,
                data: registerUserResponse,
                message: ResponseMessages.USER_REGISTER_SUCCESS,
                success: true,
            });
        });

        it("should return email exists message when user with given email already exists", async () => {
            const existingUser = {email: "test@example.com", password: "1234!64A", name: "Test User"};
            (UserService.prototype.findUserByEmail as jest.Mock).mockResolvedValueOnce(existingUser);

            await controller.register(requestBody, res);

            expect(res.send).toHaveBeenCalledWith({
                code: ResponseCode.EMAIL_EXITS,
                data: {},
                message: ResponseMessages.EMAIL_EXITS,
                success: false,
            });
        });

        it("should handle internal server error", async () => {
            (UserService.prototype.findUserByEmail as jest.Mock).mockRejectedValueOnce(new Error());

            await controller.register(requestBody, res);

            expect(res.send).toHaveBeenCalledWith({
                code: ResponseCode.INTERNAL_SERVER_ERROR,
                data: "Error",
                message: ResponseMessages.INTERNAL_SERVER_ERROR,
                success: false,
            });
        });
    });

    describe("login", () => {
        const res = mockResponse();
        const req = mockRequest();
        const loginDTO = { email: "test@example.com", password: "1234!64A" };

        it("should return access token on successful login", async () => {
            const accessToken = "mockAccessToken";
            (AuthService.prototype.login as jest.Mock).mockResolvedValueOnce(accessToken);

            await controller.login(req, loginDTO, res);

            expect(res.send).toHaveBeenCalledWith({
                code: ResponseCode.SUCCESS,
                data: accessToken,
                message: ResponseMessages.USER_LOGIN_SUCCESS,
                success: true,
            });
        });

        it("should handle internal server error", async () => {
            (AuthService.prototype.login as jest.Mock).mockRejectedValueOnce(new Error());

            await controller.login(req, loginDTO, res);

            expect(res.send).toHaveBeenCalledWith({
                code: undefined,
                data: new Error(),
                message: ResponseMessages.INTERNAL_SERVER_ERROR,
                success: false,
            });
        });
    });
});
