import app, { BootstrapSettings } from '../../src/app'

import request from 'supertest'
import { env } from '../../src/config'
import { UserCreateRequest } from '../../src/app/controllers/requests/userCreateRequest'
import { migrateDatabase } from './utils/database'
import { User } from '../../src/app/models/user'
import { runDbSeed } from './utils/seed'

describe('/api/users', () => {
  let settings: BootstrapSettings

  beforeAll(async () => {
    settings = await app(true)
    await migrateDatabase(settings.connection)
    await runDbSeed(settings.connection)
  })

  afterAll(async () => {
    await settings.connection.close()
  })

  test('POST: / should register and return user info', async (done) => {
    const newUser = {
      username: 'testuser',
      password: 'testusertestuser123',
      email: 'testuser@testmail.com'
    }
    const response = await request(settings.app)
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBeDefined()
    expect(response.body.username).toBe(newUser.username)
    expect(response.body.email).toBe(newUser.email)

    // We can probably expect that the password be excluded and other stuff

    done()
  })

  test('GET: / should login and return token and test auth page ', async (done) => {
    const user = {
      username: 'user',
      password: 'useruser'
    }
    const response = await request(settings.app)
      .post('/api/users/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBeDefined()
    expect(response.body.token).toBeDefined()

    const response2 = await request(settings.app)
      .get('/api/users/info')
      .set('Authorization', 'Bearer ' + response.body.token)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response2.body.id).toBeDefined()
    expect(response2.body.username).toBeDefined()
    expect(response2.body.email).toBeDefined()

    done()
  })
})
