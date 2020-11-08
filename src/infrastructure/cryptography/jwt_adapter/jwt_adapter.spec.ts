import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt_adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return await new Promise((resolve) => resolve('any_token'))
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sign with corrects values', async () => {
    // arrange
    const sut = new JwtAdapter('any_secret_key')
    const signSpy = jest.spyOn(jwt, 'sign')
    // act
    await sut.encrypt('any_id')
    // assert
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret_key')
  })

  test('Should return a token on sign success', async () => {
    // arrange
    const sut = new JwtAdapter('any_secret_key')
    // act
    const accessToken = await sut.encrypt('any_id')
    // assert
    expect(accessToken).toBe('any_token')
  })
})
