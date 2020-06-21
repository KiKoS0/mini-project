import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class UserBookCreateRequest {
    @IsNotEmpty()
    @IsUUID()
    public userId!: string;

    @IsNotEmpty()
    public bookId!: number;

    @IsNotEmpty()
    @IsNumber()
    public state!: number;
}
