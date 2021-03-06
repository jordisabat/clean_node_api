import { AddAccountRepository } from '../../../../data/protocols/db/account/add_account_repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load_account_by_email_repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update_access_token_repository'
import { AccountModel } from '../../../../domain/models/account_model'
import { AddAccountModel } from '../../../../domain/usecases/add_account'
import { MongoHelper } from '../helpers/mongo_helper'

export class AccountMongoRepository
implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository {
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

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: id },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }
}
