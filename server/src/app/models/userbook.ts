import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, PrimaryColumn, OneToOne, JoinColumn, Index } from 'typeorm'
import { Book } from './book'
import { User } from './user'

@Entity()
@Index(['userId', 'bookId'], { unique: true })
export class UserBook {
    @Column({ type: 'int' })
    public state!: number;

    @PrimaryGeneratedColumn('uuid')
    public userId!: string;

    @PrimaryColumn()
    public bookId!: number;

    @ManyToOne(() => User, user => user.userConnection, { primary: true })
    @JoinColumn({ name: 'userId' })
    public user!: Promise<User>;

    @ManyToOne(() => Book, book => book.bookConnection, { primary: true })
    @JoinColumn({ name: 'bookId' })
    public book!: Promise<Book>;
}
