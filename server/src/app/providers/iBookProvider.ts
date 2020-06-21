import { BookCreateDto } from './dtos/bookCreateDto'

export interface IBookProvider {
    search(query: string): Promise<any|undefined>
    getBookById(id: string): Promise<any|undefined>
    getProviderName():string;
    adaptSearch(data: any): Promise<any|undefined>
    adaptGet(data: any): BookCreateDto
}
