import { Validation } from '../../presentation/controllers/signup/signup_protocols'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_field_validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation_composite'
import { makeSignUpValidation } from './signup_validator'

jest.mock('../../presentation/helpers/validators/validation_composite.ts')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    // arrange
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    // act
    makeSignUpValidation()
    // assert
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
