import { EmailValidatorAdapter } from './email_validator'

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    // arrange
    const sut = new EmailValidatorAdapter()
    const invalidEmail = 'invalid_email@mail.com'
    // act
    const isValid = sut.isValid(invalidEmail)

    // assert
    expect(isValid).toBe(false)
  })
})
