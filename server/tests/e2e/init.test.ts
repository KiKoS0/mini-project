import app, { BootstrapSettings } from '../../src/app'

import request from 'supertest'
import { env } from '../../src/config'

describe('/', () => {
  let settings:BootstrapSettings

  beforeEach(async () => {
    settings = await app(true)
  })

  afterEach(async () => {
    await settings.connection.close()
  })

  test('GET / should return placeholder page', async (done) => {
    const _ = await request(settings.app)
      .get('/')
      .expect('Content-Type', /text\/html.*/)
      .expect(200)
    done()
  })
})
