import {IsDefined, IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDTO {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}
