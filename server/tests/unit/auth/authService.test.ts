import { JwtAuthService } from '../../../src/app/auth/jwtAuthService'
import { User } from '../../../src/app/models/user'
import { v4 as uuidv4 } from 'uuid'
import { RepositoryMock } from '../utils/repositoryMock'
import httpMocks from 'node-mocks-http'

describe('AuthService', () => {
  let authService: JwtAuthService
  let userRepository: RepositoryMock<User>
  beforeEach(() => {
    userRepository = new RepositoryMock<User>()
    authService = new JwtAuthService(userRepository as any)
  })

  describe('generateJwtToken | verifyJwtToken', () => {
    test('Should return the credentials of the basic authorization header', async () => {
      const user = new User()
      user.username = 'Michael'
      user.id = uuidv4()
      const token = authService.generateJwtToken(user)
      expect(typeof token).toBe('string')
      const req = httpMocks.createRequest({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const payload = authService.verifyJwtToken(req)
      expect(payload.id).toBe(user.id)
      expect(payload.username).toBe(user.username)
    })
  })
})
