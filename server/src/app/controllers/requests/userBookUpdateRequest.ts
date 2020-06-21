import { IsNotEmpty, IsNumber } from 'class-validator'

export class UserBookUpdateRequest {
    @IsNotEmpty()
    public bookId!: number;

    @IsNotEmpty()
    @IsNumber()
    public state!: number;
}
