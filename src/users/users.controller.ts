import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/users.dto";
import { UsersRepository } from "./users.repository";

@Controller('users')
export class UsersController {
    constructor(private readonly usersRepository: UsersRepository) {}

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        try {
            return await this.usersRepository.create(body)
        } catch(e) {
            if (e.code === 11000) {
                return {
                    "message": "this user already exist"
                }
            }
        }
    }
}