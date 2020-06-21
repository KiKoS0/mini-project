import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class UserCreateRequest {
    @IsNotEmpty()
    public username!: string;

    @IsEmail()
    @IsNotEmpty()
    public email!: string;

    @MinLength(6)
    @IsNotEmpty()
    public password!: string;
}
