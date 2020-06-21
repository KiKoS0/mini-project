
import { Action } from 'routing-controllers'
import { Container } from 'typedi'
import { Connection } from 'typeorm'

import { JwtAuthService } from './jwtAuthService'

export function authorizationChecker (connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
  const authService = Container.get<JwtAuthService>(JwtAuthService)

  return async function innerAuthorizationChecker (action: Action, roles: string[]): Promise<boolean> {
    // here you can use request/response objects from action
    // also if decorator defines roles it needs to access the action
    // you can use them to provide granular access check
    // checker must return either boolean (true or false)
    // either promise that resolves a boolean value
    const user = authService.verifyJwtToken(action.request)
    if (user === undefined) {
      return false
    }
    // This is supposed to pass enough information for currentUserChecker to get the user from the database
    // Not to be used
    action.request.user = user
    return true
  }
}
