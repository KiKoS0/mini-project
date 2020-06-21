import { EntityRepository, Repository } from 'typeorm'

import { News } from '../../models/news'

@EntityRepository(News)
export class NewsRepository extends Repository<News> {

}
