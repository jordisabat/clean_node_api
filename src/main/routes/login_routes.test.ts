import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infrastructure/db/mongodb/helpers/mongo_helper'
import app from '../config/app'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
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

  describe('POST /login', () => {
    test('Should return an account wiht 200 on login success', async () => {
      // assert
      const url = '/api/login'
      const hashedPassword = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: hashedPassword
      })
      // act assert
      await request(app)
        .post(url)
        .send({
          email: 'valid_email@mail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
