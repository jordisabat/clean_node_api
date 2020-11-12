import { AddAccountRepository } from '../../protocols/db/account/add_account_repository'
import { LoadAccountByEmailRepository } from '../authentication/db_authentication_protocols'
import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Hasher
} from './db_add_account_protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email
    )
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(
        Object.assign(accountData, { password: hashedPassword })
      )
      return await new Promise((resolve) => resolve(newAccount))
    }
    return null
  }
}
