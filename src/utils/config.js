import { PublicKey } from '@solana/web3.js'

// eslint-disable-next-line no-undef
export const showTokenInfoDialog = !!localStorage.getItem(
  'showTokenInfoDialog',
)

export const showSwapAddress = true
export const { MASTER_BUILD } = process.env

export const RIN_MINT = new PublicKey(
  'E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp',
)
