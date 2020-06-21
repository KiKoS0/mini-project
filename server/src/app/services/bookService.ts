import Container, { Service } from 'typedi'

import { User } from '../models/user'
import { UserRepository } from '../repositories/userRepository'
import { BookProviderToken } from '../providers/utils/bookProviderToken'
import { BookSearchDto } from '../providers/dtos/bookSearchDto'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { Book } from '../models/book'
import { BookRepository } from '../repositories/bookRepository'
import { BookProviders } from '../providers/utils/bookProviderLoader'
import { IBookProvider } from '../providers/iBookProvider'

@Service()
export class BookService {
  constructor (
    @OrmRepository() private bookRepository: BookRepository
  ) { }

  public async search (query: string): Promise<any | undefined> {
    const providers = Container.getMany(BookProviderToken)
    let results : BookSearchDto[] = []

    for (const provider of providers) {
      const asyncResult = await provider.search(query).then(data => {
        console.log(data)
        return provider.adaptSearch(data)
      })

      // For now just concat the results
      // TODO: Filter/prioritize/Join the results
      results = results.concat(asyncResult)
    }
    return results
  }

  public findByBooktitle (booktitle: string) : Promise<Book | undefined> {
    return this.bookRepository.findOne({ title: booktitle })
  }

  public findAll (): Promise<Book []> {
    return this.bookRepository.find()
  }

  public findOne (id: number): Promise<Book | undefined> {
    return this.bookRepository.findOne({ id })
  }

  public findByIsbn (isbn: string): Promise<Book | undefined> {
    return this.bookRepository.findOne({ isbn })
  }

  public async create (id:string, providerName:string): Promise<Book | undefined> {
    const providers = Container.getMany(BookProviderToken)
    const provider = providers.find(p => p.getProviderName() === providerName)

    if (provider) {
      const data = await provider.getBookById(id)
      const bookFromProvider = provider.adaptGet(data)
      let book = await this.findByIsbn(bookFromProvider.isbn)
      if (!book) {
        book = await this.bookRepository.save(Book.buildFromCreateBookDto(bookFromProvider))
      }
      return book
    }
  }

  public update (id: number, book: Book): Promise<Book> {
    book.id = id
    return this.bookRepository.save(book)
  }

  public async delete (bookId: number) {
    await this.bookRepository.delete(bookId)
  }
}
