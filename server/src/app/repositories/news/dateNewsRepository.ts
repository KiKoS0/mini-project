import { EntityRepository, Repository } from 'typeorm'

import { NewsDate } from '../../models/dateNews'

@EntityRepository(NewsDate)
export class DateNewsRepository extends Repository<NewsDate> {

}
