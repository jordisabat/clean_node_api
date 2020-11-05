import { DbAddAccount } from '../../../data/usecases/add_account/db_add_account'
import { BcryptAdapter } from '../../../infrastructure/cryptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../../infrastructure/db/mongodb/account_repository/account_repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { LogMongoRepository } from '../../../infrastructure/db/mongodb/log_repository/log_repository'
import { makeSignUpValidation } from './signup_validator'

export const makeSignUpController = (): Controller => {
  const addAccountRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const signUpValidation = makeSignUpValidation()
  const signUpController = new SignUpController(dbAddAccount, signUpValidation)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
