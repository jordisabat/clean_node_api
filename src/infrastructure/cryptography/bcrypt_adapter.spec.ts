import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => resolve('hash_value'))
  },

  async compare(): Promise<boolean> {
    return await new Promise((resolve) => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    // arrange
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    // act
    await sut.hash('any_value')
    // assert
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on hash success', async () => {
    // arrange
    const sut = makeSut()
    // act
    const hash = await sut.hash('any_value')
    // assert
    expect(hash).toBe('hash_value')
  })

  test('Should throw if hash throws', async () => {
    // arrange
    const sut = makeSut()
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    // act
    const promise = sut.hash('any_value')
    // assert
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    // arrange
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    // act
    await sut.compare('any_value', 'any_hash')
    // assert
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
})
