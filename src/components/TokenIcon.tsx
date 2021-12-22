/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import { TokenInstructions } from '@project-serum/serum'
import React, { useState } from 'react'
import CoinPlaceholder from '../images/basic/tokenIconPlaceholder.svg'
import { RIN_MINT } from '../utils/config'

export const TokenIcon = ({
  mint,
  tokenLogoUri,
  tokenName,
  size = '4rem',
  style = {},
}: {
  mint?: string;
  tokenLogoUri?: string;
  tokenName: string;
  size?: string;
  style?: {}
}) => {
  const [hasError, setHasError] = useState(false)

  if (mint === TokenInstructions.WRAPPED_SOL_MINT.toString()) {
    tokenLogoUri = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png'
  }

  if (mint === RIN_MINT.toString()) {
    tokenLogoUri = 'https://aldrin.com/logo_rounded.png'
  }

  if (hasError || !tokenLogoUri) {
    tokenLogoUri = CoinPlaceholder
  }

  return (
    <img
      src={tokenLogoUri}
      title={tokenName}
      alt={tokenName}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        ...style,
      }}
      onError={() => setHasError(true)}
    />
  )
}
