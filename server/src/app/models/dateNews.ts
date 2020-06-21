import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm'
import { IsNotEmpty, IsDateString } from 'class-validator'
import { News } from './news'

@Entity()
@Unique(["date"])
export class NewsDate {
    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column()
    @IsNotEmpty()
    @IsDateString()
    public date!: Date

    @OneToMany(() => News, (news) => news.createdDate, {
        cascade: true
    })
    public news!: News[]
}

