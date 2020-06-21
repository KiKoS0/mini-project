import { IsNotEmpty } from 'class-validator'

export class UserLoginRequest {
    @IsNotEmpty()
    public username!: string;

    @IsNotEmpty()
    public password!: string;
}
