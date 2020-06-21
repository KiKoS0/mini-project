import { Action } from 'routing-controllers'
import { Connection } from 'typeorm'

import { User } from '../models/user'
import { JwtAuthService } from './jwtAuthService'
import Container from 'typedi'

export function currentUserChecker (connection: Connection): (action: Action) => Promise<User | undefined> {
  return async function innerCurrentUserChecker (action: Action): Promise<User | undefined> {
    const authService = Container.get<JwtAuthService>(JwtAuthService)
    const user = action.request.user
    if (user) {
      return authService.getUser(user.id)
    }
    return undefined
  }
}
