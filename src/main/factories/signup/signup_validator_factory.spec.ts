import {
  EmailValidator,
  Validation
} from '../../../presentation/controllers/signup/signup_controller_protocols'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '../../../presentation/helpers/validators'
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare_fields_validation'
import { makeSignUpValidation } from './signup_validator_factory'

jest.mock('../../../presentation/helpers/validators/validation_composite.ts')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    // arrange
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(
      new CompareFieldValidation('password', 'passwordConfirmation')
    )
    validations.push(new EmailValidation('email', makeEmailValidator()))
    // act
    makeSignUpValidation()
    // assert
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
