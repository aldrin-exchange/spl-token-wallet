/* eslint-disable react/prop-types */
import React from 'react'
import { Checkbox } from '../../components/commonStyledComponents/Checkbox'
import { TransparentContainer, Row } from '../../components/commonStyledComponents/Containers'
import { LgTitle, ThinGreenText } from '../../components/commonStyledComponents/Text'
import { findAssociatedTokenAddress } from '../../utils/tokens'
import { abbreviateAddress, formatSymbol, stripDigitPlaces } from '../../utils/utils'
import { useBalanceInfo } from '../../utils/wallet'

const associatedTokensCache = {}


export const AccountItem = ({ publicKey, setForceUpdate }) => {
  const balanceInfo = useBalanceInfo(publicKey)

  const {
    amount, decimals, mint, tokenName, tokenSymbol,
  } = balanceInfo || {
    amount: 0,
    decimals: 8,
    mint: null,
    tokenName: 'Loading...',
    tokenSymbol: '--',
  }

  // Fetch and cache the associated token address.
  if (publicKey && mint) {
    if (
      associatedTokensCache[publicKey.toString()] === undefined
        || associatedTokensCache[publicKey.toString()][mint.toString()] === undefined
    ) {
      findAssociatedTokenAddress(publicKey, mint).then((assocTok) => {
        const walletAccounts = {

          ...associatedTokensCache[publicKey.toString()],
        }
        walletAccounts[mint.toString()] = assocTok
        associatedTokensCache[publicKey.toString()] = walletAccounts
        if (assocTok.equals(publicKey)) {
          // Force a rerender now that we've cached the value.
          setForceUpdate((forceUpdate) => !forceUpdate)
        }
      })
    }
  }

  const isAssociatedToken = publicKey && mint && associatedTokensCache[publicKey.toString()]
    ? associatedTokensCache[publicKey.toString()][mint.toString()]
    : false

  const accBalance = amount / 10 ** decimals

  return (
    <TransparentContainer align="center" direction="row" justify="space-between">
      <Row height="100%" direction="column" align="flex-start" justify="space-between">
        <LgTitle>
          {isAssociatedToken && 'as'}
          {formatSymbol(publicKey.toBase58())}
        </LgTitle>
        <ThinGreenText>
          {`${stripDigitPlaces(
            accBalance,
            decimals,
          )} ${tokenName ?? abbreviateAddress(mint)} ${
            tokenSymbol ? ` (${tokenSymbol})` : null
          }`}
        </ThinGreenText>
      </Row>
      <Checkbox checked={accBalance > 0} onChange={() => {}} />
    </TransparentContainer>
  )
}

