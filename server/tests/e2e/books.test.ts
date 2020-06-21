import app, { BootstrapSettings } from '../../src/app'

import request from 'supertest'
import { GoogleBookProvider } from '../../src/app/providers/googleBookProvider'

describe('/api/users', () => {
  let settings:BootstrapSettings

  beforeAll(async () => {
    settings = await app(true)
  })

  afterAll(async () => {
    await settings.connection.close()
  })

  test('GET: /books/search ', async (done) => {
    const response = await request(settings.app)
      .get('/api/books/search')
      .query({ name: 'Song of ice and fire' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.length).toBeGreaterThan(1)
    expect(response.body[0].title).toBeDefined()
    // expect(response.body[0].description).toBeDefined()
    expect(response.body[0].authors).toBeDefined()

    done()
  })

  test('POST: /books ', async (done) => {
    const response = await request(settings.app)
      .post('/api/books')
    // Fragile test: if broken check if the id is actually still valid
      .send({ id: 'kPmLDQAAQBAJ', provider: GoogleBookProvider.ProviderName })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBeDefined()
    expect(response.body.title).toBeDefined()

    done()
  })
})
