import { AccountModel } from '../../../domain/models/account_model'
import { AddAccountModel } from '../../../domain/usecases/add_account'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
