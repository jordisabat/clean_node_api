import { DbAddAccount } from '../../../data/usecases/add_account/db_add_account'
import { BcryptAdapter } from '../../../infrastructure/cryptography/bcrypt_adapter/bcrypt_adapter'
import { AccountMongoRepository } from '../../../infrastructure/db/mongodb/account/account_mongo_repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log_controller_decorator'
import { LogMongoRepository } from '../../../infrastructure/db/mongodb/log/log_mongo_repository'
import { makeSignUpValidation } from './signup_validator_factory'

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
