import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import {UserDal} from "./repositories/user.dal";
import {MongooseModule} from "@nestjs/mongoose";
import {Users, UserSchema} from "../../schemas/user.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }])],
  providers: [UserService,UserDal],
  exports:[UserService]
})
export class UserModule {}
