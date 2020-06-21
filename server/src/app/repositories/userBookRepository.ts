import { EntityRepository, Repository } from 'typeorm'

import { UserBook } from '../models/userbook'

@EntityRepository(UserBook)
export class UserBookRepository extends Repository<UserBook> {

}
