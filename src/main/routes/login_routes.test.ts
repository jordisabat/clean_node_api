import request from 'supertest'
import { MongoHelper } from '../../infrastructure/db/mongodb/helpers/mongo_helper'
import app from '../config/app'

describe('Login routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return an account wiht 200 on signup success', async () => {
      // assert
      const url = '/api/signup'
      // act assert
      await request(app)
        .post(url)
        .send({
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
})
