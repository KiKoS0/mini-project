import { GoogleBookProvider } from '../googleBookProvider'
import { GoodReadsBookProvider } from '../goodreadsBookProvider'
import { IBookProvider } from '../iBookProvider'

export const BookProviders = [
  GoogleBookProvider
  // GoodReadsBookProvider
]

export function loadBooksProviders (iocContainer: { import(funcs: any): any; }) {
  iocContainer.import(BookProviders)
}
