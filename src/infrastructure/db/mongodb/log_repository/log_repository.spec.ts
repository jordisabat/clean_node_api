import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo_helper'
import { LogMongoRepository } from './log_repository'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })
  test('Should create an error log on success', async () => {
    // arrange
    const sut = makeSut()

    // act
    await sut.logError('any_error')

    // assert
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
