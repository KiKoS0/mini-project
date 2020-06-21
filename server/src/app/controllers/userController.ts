import { User } from '../models/user'
import { UserService } from '../services/userService'
import { UserCreateRequest } from './requests/userCreateRequest'

import { JsonController, Body, Post, UnauthorizedError, Get, Authorized, CurrentUser } from 'routing-controllers'
import { UserLoginRequest } from './requests/userLoginRequest'
import { UserLoginResponse } from './responses/userLoginResponse'
import { JwtAuthService } from '../auth/jwtAuthService'
import ApiError from './errors/apiError'
import { ApiCode } from './errors/apiCode'

@JsonController('/users')
export class UserController {
  constructor (
        private userService: UserService,
        private authService: JwtAuthService
  ) { }

  @Post()
  public async create (@Body() body: UserCreateRequest): Promise<UserLoginResponse> {
    let user = new User()
    user.email = body.email
    user.username = body.username
    user.password = body.password

    user = await this.userService.create(user)
    return {
      id: user.id,
      token: this.authService.generateJwtToken(user),
      username: user.username,
      email: user.email
    }
  }

  @Post('/login')
  public async login (@Body() body: UserLoginRequest): Promise<UserLoginResponse> {
    let user = await this.userService.findByUsername(body.username)
    if (!user) {
      throw new ApiError(ApiCode.UsernamePasswordError, 401)
    }
    const passwordCheck = await User.comparePassword(user, body.password)
    if (passwordCheck === true) {
      user = user as User
      return {
        id: user.id,
        token: this.authService.generateJwtToken(user),
        username: user.username,
        email: user.email
      }
    } else {
      throw new ApiError(ApiCode.UsernamePasswordError, 401)
    }
  }

  @Get('/info')
  @Authorized()
  public async testAuth (@CurrentUser() user?: User): Promise<UserLoginResponse> {
    const currentUser = user as User
    return {
      id: currentUser.id,
      token: this.authService.generateJwtToken(currentUser),
      username: currentUser.username,
      email: currentUser.email
    }
  }
}
