import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/users.dto";
import { User, UserDocument } from "./schemas/users.schema";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel("us") private usersModel: Model<UserDocument>) {}

    async create(data: CreateUserDto) {
        return await this.usersModel.create(data)
    }
}