import { BcryptAdapter } from '../../../../infrastructure/cryptography/bcrypt_adapter/bcrypt_adapter'
import { AccountMongoRepository } from '../../../../infrastructure/db/mongodb/account/account_mongo_repository'
import { AddAccount } from '../../../../domain/usecases/add_account'
import { DbAddAccount } from '../../../../data/usecases/add_account/db_add_account'

export const makeDbAddAccount = (): AddAccount => {
  const addAccountRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(bcryptAdapter, addAccountRepository)
}
