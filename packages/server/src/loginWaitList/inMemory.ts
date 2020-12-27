import { Account } from '@ss/types';
import LoginWaitList, { AccountTimedOut } from '../service/loginWaitList';

type Ban = {
  until: number,
  level: number,
}

export default class InMemory implements LoginWaitList {
  bans: { [key: string]: Ban };

  constructor() {
    this.bans = {};
  }

  check(account: Account): Account {
    const ban = this.bans[account.email];

    if(ban) {
      if(ban.until < Date.now()) {
        delete this.bans[account.email];
      } else {
        throw new AccountTimedOut(ban.until);
      }
    }

    return account;
  }

  add(account: Account) {
    const ban = this.bans[account.email];

    if(ban) {
      if(ban.until < Date.now()) {
        this.bans[account.email] = {
          until: Date.now() + 60_000,
          level: 1,
        }
      } else {
        this.bans[account.email] = {
          until: Date.now() + Math.pow(60_000, ban.level),
          level: ban.level + 1,
        }
      }
    } else {
      this.bans[account.email] = {
        until: Date.now() + 60_000,
        level: 1,
      }
    }
  }
}
