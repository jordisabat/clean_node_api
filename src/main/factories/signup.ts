import { DbAddAccount } from '../../data/usecases/add_account/db_add_account'
import { BcryptAdapter } from '../../infrastructure/cryptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../infrastructure/db/mongodb/account_repository/account_repository'
import { SignUpController } from '../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email_validator_adaptor'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoRepository } from '../../infrastructure/db/mongodb/log_repository/log_repository'
import { makeSignUpValidationController } from './signup_validator'

export const makeSignUpController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const signUpValidationController = makeSignUpValidationController()
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount,
    signUpValidationController
  )
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
