/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-const */
import { PublicKey } from '@solana/web3.js'
import { RowWithStrechedContent, Row } from '../../components/commonStyledComponents/Containers'
import { LgTitle, ThinGreenText } from '../../components/commonStyledComponents/Text'
import { TokenIcon } from '../../components/TokenIcon'
import { findAssociatedTokenAddress } from '../../utils/tokens'
import { isUSDToken, stripDigitPlaces, TokenInfo } from '../../utils/utils'

export const associatedTokensCache = {}

export const AssetRow = ({
  el, wallet, balanceInfo, tokensData,
}:{
  el:TokenInfo, wallet:any, balanceInfo:any, tokensData:any
}) => {
  let {
    mint,
    // @ts-ignore
    name: tokenName,
    // @ts-ignore
    symbol: tokenSymbol,
  } = balanceInfo || {
    amount: 0,
    mint: '',
    name: 'Loading...',
    symbol: '--',
  }

  if (tokenName === 'Cryptocurrencies.Ai') {
    tokenName = 'Aldrin'
  }


  // Fetch and cache the associated token address.
  if (wallet && wallet.publicKey && mint) {
    if (
      associatedTokensCache[wallet.publicKey.toString()] === undefined
      || associatedTokensCache[wallet.publicKey.toString()][mint] === undefined
    ) {
      findAssociatedTokenAddress(wallet.publicKey, new PublicKey(mint)).then(
        (assocTok) => {
          const walletAccounts = {

            ...associatedTokensCache[wallet.publicKey.toString()],
          }
          walletAccounts[mint] = assocTok
          associatedTokensCache[wallet.publicKey.toString()] = walletAccounts
        },
      )
    }
  }

  const closePrice = tokensData?.get(`${el.symbol.toUpperCase()}`) || 0

  let priceForCalculate = closePrice

  if (isUSDToken(tokenSymbol)) {
    priceForCalculate = 1
  }

  const usdValue = priceForCalculate === undefined // Not yet loaded.
    ? undefined
    : priceForCalculate === null // Loaded and empty.
      ? null
      : +(el.amount * priceForCalculate).toFixed(2) // Loaded.


  return (
    <RowWithStrechedContent style={{ maxHeight: '4rem' }}>
      <Row>
        <TokenIcon mint={el.mint} tokenName={el.name} tokenLogoUri={el.tokenLogoUri} style={{ margin: '0 1rem 0 0' }} />
        <Row height="100%" direction="column" align="flex-start" justify="space-between">
          <LgTitle>{el.symbol}</LgTitle>
          <ThinGreenText>
            {el.amount}
            {' '}
            {el.symbol}
          </ThinGreenText>
        </Row>
      </Row>
      <Row height="100%" direction="column" align="flex-end" justify="space-between">
        <LgTitle>
          {` $${stripDigitPlaces(
            usdValue || 0,
            2,
          )}`}
        </LgTitle>
        <ThinGreenText>
          $
          {priceForCalculate || 0}
        </ThinGreenText>
      </Row>
    </RowWithStrechedContent>
  )
}
