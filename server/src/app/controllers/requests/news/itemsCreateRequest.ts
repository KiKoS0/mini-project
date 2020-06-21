import { IsNotEmpty, IsDateString } from 'class-validator'

export class ItemsCreateRequest {
    @IsNotEmpty()
    public title!: string

    @IsNotEmpty()
    public source!: string

    @IsNotEmpty()
    public link!: string

    @IsNotEmpty()
    public description!: string

    @IsNotEmpty()
    public img!: string

    @IsNotEmpty()
    @IsDateString()
    public publishedDate!: Date
}