import { Validation } from '../../presentation/controllers/signup/signup_protocols'
import { CompareFieldValidation } from '../../presentation/helpers/validators/compare_fields_validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_field_validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation_composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  )

  return new ValidationComposite(validations)
}
