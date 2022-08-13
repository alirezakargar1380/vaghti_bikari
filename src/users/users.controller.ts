import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "./dto/users.dto";
import { User } from "./schemas/users.schema";
import { UsersRepository } from "./users.repository";

@Controller('users')
export class UsersController {
    constructor(private readonly usersRepository: UsersRepository) { }

    @Post("/login")
    async loginUser(@Body() body: LoginUserDto) {
        try {
            const data: User = await this.usersRepository.findOne(body.username_or_email)
            if (data.password !== body.password)
                return ":("

            return ":)"    
        } catch (e) {
            return e
        }
    }

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        try {
            return await this.usersRepository.create(body)
        } catch (e) {
            return e
            if (e.code === 11000) {
                return {
                    "message": "this user already exist"
                }
            }
        }
    }
}