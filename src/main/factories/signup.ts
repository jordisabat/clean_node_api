import { DbAddAccount } from '../../data/usecases/add_account/db_add_account'
import { BcryptAdapter } from '../../infrastructure/cryptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../infrastructure/db/mongodb/account_repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../presentation/utils/email_validator_adaptor'

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)

  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )
  return signUpController
}
