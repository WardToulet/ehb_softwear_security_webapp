import { NewAccount, Account } from '@ss/types';

import Repo, { AccountTaken, AccountDoesNotExist } from '../../service/repo'; 

class InMemory implements Repo {
  accounts: Account[] = [];

  createAccount(newAccount: NewAccount): Account {
    // Throw an error if an account with this email is already registered
    if(this.accounts.some((a: Account) => a.email === newAccount.email))
      throw new AccountTaken(newAccount.email);

    // Crate account entity
    const account: Account = {
      ...newAccount,
      id: Math.floor(Math.random() * 100_000_000).toString(),
      activeated: false,
    }
  
    // Add the acount to the in memory list
    this.accounts.push(account);

    return account;
  }

  getAccountByEmail(email: string): Account {
    const account = this.accounts.filter((a: Account) => a.email === email).pop();

    // Throws an AccountDoesNotExist if no account with that email exists
    if(!account) {
      throw new AccountDoesNotExist({ email }) ;
    }

    return account as Account;
  }

  getAccountById(id: string): Account {
    const account = this.accounts.filter((a: Account) => a.id === id).pop();

    // Throws an AccountDoesNotExist if no account with that email exists
    if(!account) {
      throw new AccountDoesNotExist({ id }); 
    }

    return account as Account;
  }
}

export default InMemory;
