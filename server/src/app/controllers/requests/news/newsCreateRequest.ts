import { DateCreateRequest } from './dateCreateRequest'
import { ItemsCreateRequest } from './itemsCreateRequest'
import { IsNotEmpty } from 'class-validator'

export class NewsCreateRequest {
    @IsNotEmpty()
    public news!: ItemsCreateRequest[]

    @IsNotEmpty()
    public createdDate!: DateCreateRequest
}