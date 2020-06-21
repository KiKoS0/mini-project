import { IsNotEmpty, IsDateString } from "class-validator";

export class DateCreateRequest{
    @IsNotEmpty()
    @IsDateString()
    public date!: Date
}