import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('Should enable CORS', async () => {
    // assert
    const url = '/test_cors'
    // act
    app.get(url, (req, res) => {
      res.send()
    })
    // assert
    await request(app)
      .get(url)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
