import { LocalStorageWalletProvider } from './localStorage'
import { LedgerWalletProvider } from './ledger'

export class WalletProviderFactory {
  // eslint-disable-next-line consistent-return
  static getProvider(type, args) {
    if (type === 'local') {
      return new LocalStorageWalletProvider(args)
    }

    if (type === 'ledger') {
      return new LedgerWalletProvider(args)
    }
  }
}
