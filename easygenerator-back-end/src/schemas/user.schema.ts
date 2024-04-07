import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({collection: "user"})
export class Users {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({default: () => Date.now()})
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
