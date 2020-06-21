import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { UserBook } from './userbook'

@Entity()
export class User {
  public static hashPassword (password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err)
        }
        resolve(hash)
      })
    })
  }

  public static comparePassword (user: User, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res === true)
      })
    })
  }

  @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ name: 'username' })
    @IsNotEmpty()

    public username!: string;

    @Column()
    @IsNotEmpty()

    public email!: string;

    @Column()
    @Exclude()
    @IsNotEmpty()

    public password!: string;

    @BeforeInsert()
    public async hashPassword (): Promise<void> {
      this.password = await User.hashPassword(this.password)
    }

    @OneToMany(() => UserBook, ub => ub.user)
    public userConnection!: Promise<UserBook[]>
}
