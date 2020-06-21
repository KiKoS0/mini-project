import { JsonController, Post, Body, Put, Param, Get, QueryParams } from 'routing-controllers'
import { BookService } from '../services/bookService'
import { BookCreateRequest } from './requests/bookCreateRequest'
import { Book } from '../models/book'
import { SearchBookRequest } from './requests/searchBookRequest'
import { BookCreateResponse } from './responses/bookCreateResponse'

@JsonController('/books')
export class BookController {
  constructor (
    private bookService:BookService
  ) { }

  @Get('/search')
  public async search (@QueryParams() query: SearchBookRequest): Promise<any> {
    const data = this.bookService.search(query.name)
    return data
  }

  @Get()
  public find (): Promise<Book[]> {
    return this.bookService.findAll()
  }

  @Post()
  public async create (@Body() body:BookCreateRequest): Promise<BookCreateResponse | undefined> {
    const book = await this.bookService.create(body.id, body.provider)
    if (book) {
      return {
        id: book.id,
        title: book.title
      }
    }
  }
}
