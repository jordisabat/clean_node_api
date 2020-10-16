import { MongoHelper as sut } from './mongo_helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should reconnect if mongodb is down', async () => {
    // arrange
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()

    // act
    await sut.disconnect()

    // assert
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
