import TransportWebHid from '@ledgerhq/hw-transport-webhid'
import bs58 from 'bs58'
import {
  getPublicKey,
  solana_derivation_path,
  solana_ledger_sign_bytes,
  solana_ledger_sign_transaction,
  solana_ledger_confirm_public_key,
} from './ledger-core'
import { DERIVATION_PATH } from './localStorage'

let TRANSPORT = null

export class LedgerWalletProvider {
  constructor(args) {
    this.onDisconnect = (args && args.onDisconnect) || (() => {})
    this.derivationPath = args
      ? args.derivationPath
      : DERIVATION_PATH.bip44Change
    this.account = args ? args.account : undefined
    this.change = args ? args.change : undefined
    this.solanaDerivationPath = solana_derivation_path(
      this.account,
      this.change,
      this.derivationPath,
    )
  }

  init = async () => {
    if (TRANSPORT === null) {
      TRANSPORT = await TransportWebHid.create()
    }
    this.transport = TRANSPORT
    this.pubKey = await getPublicKey(this.transport, this.solanaDerivationPath)
    this.transport.on('disconnect', this.onDisconnect)
    this.listAddresses = async () => [this.pubKey]
    // TODO: read accounts from ledger

    return this
  }

  get publicKey() {
    return this.pubKey
  }

  signTransaction = async (transaction) => {
    const sigBytes = await solana_ledger_sign_transaction(
      this.transport,
      this.solanaDerivationPath,
      transaction,
    )
    transaction.addSignature(this.publicKey, sigBytes)
    return transaction
  }

  createSignature = async (message) => {
    const sigBytes = await solana_ledger_sign_bytes(
      this.transport,
      this.solanaDerivationPath,
      message,
    )
    return bs58.encode(sigBytes)
  }

  confirmPublicKey = async () => solana_ledger_confirm_public_key(
    this.transport,
    this.solanaDerivationPath,
  )
}
