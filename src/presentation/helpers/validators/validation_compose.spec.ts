import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation_composite'

describe('Validation Composite', () => {
  test('', () => {
    // arrange
    class ValidationStub implements Validation {
      validate(input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])

    // act
    const error = sut.validate({ field: 'any_value' })

    // assert
    expect(error).toEqual(new MissingParamError('field'))
  })
})
