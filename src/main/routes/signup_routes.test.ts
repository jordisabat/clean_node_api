import request from 'supertest'
import { MongoHelper } from '../../infrastructure/db/mongodb/helpers/mongo_helper'
import app from '../config/app'

describe('SignUp routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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
