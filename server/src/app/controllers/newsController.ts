import { JsonController, Post, Body, Get, Param, QueryParam } from 'routing-controllers'
import { NewsService } from '../services/newsService'
import { NewsCreateRequest } from './requests/news/newsCreateRequest'
import { NewsResponse } from './responses/newsResponse'
import { News } from '../models/news'
import { NewsDate } from '../models/dateNews'

@JsonController('/news')
export class NewsController {
    constructor(private newsService: NewsService) { }
    @Post()
    public async create(@Body() body: NewsCreateRequest): Promise<NewsResponse> {
        const news: News[] =[]
        body.news.forEach(element => {
            const newsItem = new News()
            newsItem.title = element.title
            newsItem.source = element.source
            newsItem.link = element.link
            newsItem.description = element.description
            newsItem.img = element.img
            newsItem.publishedDate = element.publishedDate
            news.push(newsItem)
        })

        const newsDate = new NewsDate()
        newsDate.date = body.createdDate.date

        const data = await this.newsService.create(news,newsDate)
        return this.toNewsResponseFormat(data)
    }

    @Get()
    public async getNews(@QueryParam('page') pagination: number): Promise<NewsResponse>{
        const data = await this.newsService.fetchLatestNews(pagination)
        return this.toNewsResponseFormat(data)
    }

    private toNewsResponseFormat(data: News[]): NewsResponse{
        const responses = new NewsResponse()
        responses.news= []
        data.forEach((el)=>{
            const item = {
                id : el.id,
                title: el.title,
                link: el.link,
                source: el.source,
                description: el.description,
                img: el.img,
                publishedDate: el.publishedDate,
                createdDate: el.createdDate
            }
            responses.news.push(item)
        })
        return responses
    }
}
