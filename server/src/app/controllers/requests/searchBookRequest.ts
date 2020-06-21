import { IsNotEmpty } from 'class-validator'

export class SearchBookRequest {
    @IsNotEmpty()
    public name!: string;
}
