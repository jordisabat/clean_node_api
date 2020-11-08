import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt_adapter'

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
})
