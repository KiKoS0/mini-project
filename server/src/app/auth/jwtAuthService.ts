import { Request } from 'express'
import { Service } from 'typedi'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { User } from '../models/user'
import { UserRepository } from '../repositories/userRepository'
import * as jwt from 'jsonwebtoken'

import { env } from '../../config'

export class JwtPayload {
    id!: string
    username!: string
}

@Service()
export class JwtAuthService {
  constructor (
        @OrmRepository() private userRepository: UserRepository
  ) { }

  public verifyJwtToken (req: Request): JwtPayload {
    let token = req.header('authorization') as string
    token = token.replace(/Bearer\s+/, '')
    const verifyOptions = {
      issuer: env.jwt.issuer,
      expiresIn: env.jwt.expires
    }
    const payload = jwt.verify(token, env.jwt.secret, verifyOptions) as JwtPayload
    return {
      id: payload.id,
      username: payload.username
    }
  }

  public async getUser (id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } })
  }

  public generateJwtToken (user: User): any {
    const payload = {
      id: user.id,
      username: user.username
    }
    const signOptions = {
      issuer: env.jwt.issuer,
      expiresIn: env.jwt.expires
    }
    return jwt.sign(payload, env.jwt.secret, signOptions)
  }
}
