import { AddAccountRepository } from '../../../../data/protocols/db/add_account_repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load_account_by_email_repository'
import { AccountModel } from '../../../../domain/models/account_model'
import { AddAccountModel } from '../../../../domain/usecases/add_account'
import { MongoHelper } from '../helpers/mongo_helper'

export class AccountMongoRepository
implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return !account ? null : MongoHelper.map(account)
  }
}
