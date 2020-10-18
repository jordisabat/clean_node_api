import {
  AccountModel,
  AddAccountModel
} from '../usecases/add_account/db_add_account_protocols'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
