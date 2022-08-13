export class CreateUserDto {
    username: string;
    fullName: string;
    password: string;
    email: string;
}

export class LoginUserDto {
    username_or_email: string;
    password: string;
}