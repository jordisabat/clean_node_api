import { AccountModel } from '../../../domain/models/account_model'
import { LoadAccountByEmailRepository } from '../../protocols/load_account_by_email_repository'
import { DbAuthentication } from './db_authentication'

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    // arrange
    class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
      async load(email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
        return await new Promise((resolve) => resolve(account))
      }
    }

    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    // act
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    // assert
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
