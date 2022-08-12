import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/users.schema";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";

@Module({
    imports: [MongooseModule.forFeature([
        { 
            name: "us",
            schema: UserSchema
        }
    ])],
    providers: [UsersRepository],
    controllers: [UsersController]
})
export class UsersModule{}