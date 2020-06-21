import { Token } from 'typedi'
import { IBookProvider } from '../iBookProvider'

export const BookProviderToken = new Token<IBookProvider>('bookProviders')
