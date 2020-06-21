import { BookProviderToken } from './utils/bookProviderToken'
import { IBookProvider } from './iBookProvider'
import { env } from '../../config'
import { BookSearchDto } from './dtos/bookSearchDto'
import { RequestParams } from './utils/requestParams'

import xml2js from 'xml2js'
import fetch from 'node-fetch'
import { Service } from 'typedi'
import { BookCreateDto } from './dtos/bookCreateDto'

function toAuthorsArray (item: any) {
  return item.name[0]
}
function extractPublishDate (item:any) {
  let date = item.original_publication_year[0]._
  if (item.original_publication_month[0]._) {
    date = date + '-' +
    item.original_publication_month[0]._
  }
  if (item.original_publication_day[0]._) {
    date = date + '-' +
    item.original_publication_day[0]._
  }
  return date
}

@Service({ id: BookProviderToken, multiple: true })
export class GoodReadsBookProvider implements IBookProvider {
  constructor (
  ) { }

  adaptGet (data: any): BookCreateDto {
    throw new Error('Method not implemented.')
  }

  getProviderName (): string {
    return GoodReadsBookProvider.ProviderName
  }

  static ProviderName:string = 'GoodReads'

  private toBookSearchDto (item: any): BookSearchDto {
    return {
      title: item.best_book[0].title[0],
      authors: item.best_book[0].author.map(toAuthorsArray),
      description: item.best_book[0].description,
      imageLink: item.best_book[0].small_image_url[0],
      subtitle: item.best_book[0].subtitle,
      pageCount: item.best_book[0].pageCount,
      publishedDate: new Date(extractPublishDate(item)),
      id: item.best_book[0].id[0]._,
      provider: GoodReadsBookProvider.ProviderName,
      isbn: ''
    }
  }

  adaptSearch (data: any): Promise<any> {
    return data.GoodreadsResponse.search[0].results[0].work.map(this.toBookSearchDto)
  }

  async getBookById (id: string): Promise<any> {
    var url = new URL((env.providers.goodReads.endPoint as string).concat('/book/show'))
    const params: RequestParams = {
      key: env.providers.goodReads.apiKey as string,
      format: 'xml',
      id
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const r = await fetch(url).then(res => res.text()).then(res => xml2js.parseStringPromise(res))
    console.log(r)
    return null
  }

  async search (query: string) {
    var url = new URL((env.providers.goodReads.endPoint as string).concat('/search/index.xml'))
    const params: RequestParams = {
      key: env.providers.goodReads.apiKey as string,
      q: query
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url).then(res => res.text()).then(res => xml2js.parseStringPromise(res))
  }
}
