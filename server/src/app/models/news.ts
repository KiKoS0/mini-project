import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { IsNotEmpty, IsDateString } from 'class-validator'
import { NewsDate } from './dateNews'

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column()
    @IsNotEmpty()
    public title!: string

    @Column()
    @IsNotEmpty()
    public link!: string

    @Column()
    @IsNotEmpty()
    public source!: string

    @Column()
    @IsNotEmpty()
    public description!: string

    @Column()
    @IsNotEmpty()
    public img!: string

    @Column()
    @IsNotEmpty()
    @IsDateString()
    public publishedDate!: Date

    @ManyToOne(() => NewsDate, (createdDate) => createdDate.date, {
        onDelete: 'CASCADE'
    })
    public createdDate!: NewsDate


}

