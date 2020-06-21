import { Service } from 'typedi'
import { BookProviderToken } from './utils/bookProviderToken'
import { IBookProvider } from './iBookProvider'
import fetch from 'node-fetch'
import { env } from '../../config'
import { BookSearchDto } from './dtos/bookSearchDto'
import { RequestParams } from './utils/requestParams'
import { BookCreateDto } from './dtos/bookCreateDto'

@Service({ id: BookProviderToken, multiple: true })
export class GoogleBookProvider implements IBookProvider {
  constructor (
  ) { }

  adaptGet (item: any): BookCreateDto {
    return {
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      imageLink: item.volumeInfo.imageLinks?.thumbnail,
      subtitle: item.volumeInfo.subtitle,
      pageCount: item.volumeInfo.pageCount,
      publishedDate: item.volumeInfo.publishedDate,
      id: item.id,
      provider: GoogleBookProvider.ProviderName,
      isbn: item.volumeInfo.industryIdentifiers.find((e: any) => e.type === 'ISBN_13').identifier,
      providerName: this.getProviderName()
    }
  }

  async getBookById (id: string): Promise<any> {
    var url = new URL((env.providers.google.endPoint as string) + '/' + id)
    const res = await fetch(url)
    return res.json()
  }

  getProviderName (): string {
    return GoogleBookProvider.ProviderName
  }

  static ProviderName:string = 'Google'

  private toBookSearchDto (item: any): BookSearchDto {
    console.log(item.volumeInfo)
    return {
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      imageLink: item.volumeInfo.imageLinks?.thumbnail,
      subtitle: item.volumeInfo.subtitle,
      pageCount: item.volumeInfo.pageCount,
      publishedDate: item.volumeInfo.publishedDate,
      id: item.id,
      provider: GoogleBookProvider.ProviderName,
      isbn: ''
    }
  }

  adaptSearch (data: any): Promise<BookSearchDto> {
    return data.items.map(this.toBookSearchDto)
  }

  async search (query: string) {
    var url = new URL(env.providers.google.endPoint as string)
    const params: RequestParams = {
      key: env.providers.google.apiKey as string,
      q: query
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const res = await fetch(url)
    return res.json()
  }
}
