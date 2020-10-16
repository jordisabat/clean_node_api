import request from 'supertest'
import app from '../config/app'

describe('SignUp routes', () => {
  test('Should return an account on success', async () => {
    // assert
    const url = '/api/signup'
    // act assert
    await request(app)
      .post(url)
      .send({
        name: 'valid_name',
        email: 'valid_email',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
