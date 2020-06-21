import { EntityRepository, Repository } from 'typeorm'

import { Book } from '../models/book'

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {

}
