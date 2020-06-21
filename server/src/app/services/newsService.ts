import { Service } from 'typedi'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { NewsRepository } from '../repositories/news/newsRepository'
import { DateNewsRepository } from '../repositories/news/dateNewsRepository'

import { News } from '../models/news'
import { NewsDate } from '../models/dateNews'
import { Equal } from 'typeorm'

@Service()
export class NewsService {
    constructor(
        @OrmRepository() private newsRepository: NewsRepository,
        @OrmRepository() private dateNewsRepository: DateNewsRepository
    ) { }

    //Stock list of news fetched to DB
    public async create(news: News[], newsDate: NewsDate): Promise<News[]> {
        let createdDate = await this.findDate(newsDate.date.toString())
        if (createdDate) {
            newsDate = createdDate as NewsDate
        } else {
            createdDate = await this.dateNewsRepository.save(newsDate)
        }
        news.forEach(item => {
            item.createdDate = createdDate as NewsDate
        })
        return await this.newsRepository.save(news)
    }

    public async findDate(date: string): Promise<NewsDate | undefined> {
        return this.dateNewsRepository.findOne({ where: { date: Equal(date) } })
    }

    public async fetchLatestNews(pagination: number): Promise<News[]> {
        const newsCountToFetch = 10
        return this.newsRepository.createQueryBuilder('n')
            .innerJoinAndSelect('n.createdDate', 'news')
            .orderBy('news.date', 'DESC')
            .skip(pagination*newsCountToFetch)
            .take(newsCountToFetch)
            .getMany()
        }
}