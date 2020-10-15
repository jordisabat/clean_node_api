import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    // assert
    const url = '/test_body_parser'
    // act
    app.post(url, (req, res) => {
      res.send(req.body)
    })
    // assert
    await request(app)
      .post(url)
      .send({ name: 'Rodrigo' })
      .expect({ name: 'Rodrigo' })
  })
})
