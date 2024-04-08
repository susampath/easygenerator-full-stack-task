import {IsDefined, IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

import {ResponseMessages} from "../../../constants/response.messages";

export class RegisterDTO {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: ResponseMessages.PASSWORD_VALIDATION_LENGTH})
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: ResponseMessages.PASSWORD_VALIDATION_MATCH,
    })
    @ApiProperty()
    password: string;
}
