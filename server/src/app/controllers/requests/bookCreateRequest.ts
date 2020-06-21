import { IsNotEmpty, IsNumber, IsUUID, IsDate } from 'class-validator'

export class BookCreateRequest {
    @IsNotEmpty()
    public id!: string;

    @IsNotEmpty()
    public provider!: string;
}
