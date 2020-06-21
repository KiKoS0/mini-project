import { Service } from 'typedi'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { User } from '../models/user'
import { UserRepository } from '../repositories/userRepository'

@Service()
export class UserService {
  constructor (
        @OrmRepository() private userRepository: UserRepository
  ) { }

  public findByUsername (username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username: username })
  }

  public findAll (): Promise<User[]> {
    return this.userRepository.find()
  }

  public findOne (id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ id })
  }

  public async create (user: User): Promise<User> {
    const newUser = await this.userRepository.save(user)
    return newUser
  }

  public update (id: string, user: User): Promise<User> {
    user.id = id
    return this.userRepository.save(user)
  }

  public async delete (id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
