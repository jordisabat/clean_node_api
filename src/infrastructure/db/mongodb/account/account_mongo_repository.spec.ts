import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo_helper'
import { AccountMongoRepository } from './account_mongo_repository'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on add success', async () => {
    // arrange
    const sut = makeSut()

    // act
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    // assert
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    // arrange
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    // act
    const account = await sut.loadByEmail('any_email@mail.com')

    // assert
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    // arrange
    const sut = makeSut()
    // act
    const account = await sut.loadByEmail('any_email@mail.com')
    // assert
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    // arrange
    const sut = makeSut()
    const user = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const fakeAccount = user.ops[0]
    expect(fakeAccount.accessToken).toBeFalsy()
    // act
    await sut.updateAccessToken(fakeAccount._id, 'any_token')

    // assert
    const account = await accountCollection.findOne({ _id: fakeAccount._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
