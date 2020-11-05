import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation_composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    // arrange
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))
    // act
    const error = sut.validate({ field: 'any_value' })

    // assert
    expect(error).toEqual(new MissingParamError('field'))
  })
})
