/* eslint-disable no-console */
import React from 'react'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'
import { Button, SmallRoundButton } from '../../../components/commonStyledComponents/Buttons'
import { ContainerWithDispersedContent, TextContainer } from '../../../components/commonStyledComponents/Containers'
import { YellowHintBlock } from '../../../components/commonStyledComponents/Text'
import { COLORS, FONTS, FONT_SIZES } from '../../../components/variables'


const CopySeedPhrase = ({ mnemonicAndSeed }:{ mnemonicAndSeed }) => (
  <ContainerWithDispersedContent>
    <YellowHintBlock>
      Protect your wallet by saving your Secret Seed Phrase in a place you
      trust.
      <span style={{ fontFamily: FONTS.bd }}>
        {' '}
        It’s the only way to recover your wallet if you get locked out of
        the app or get a new device.
      </span>
    </YellowHintBlock>
    <TextContainer needBorder>
      {mnemonicAndSeed.mnemonic.split(' ').map((word) => (
        <SmallRoundButton fontSize={word.length >= 6 ? FONT_SIZES.md : FONT_SIZES.rg}>
          {word}
        </SmallRoundButton>
      ))}

    </TextContainer>
    <Button
      background={COLORS.background}
      onClick={() => {
        copy(mnemonicAndSeed.mnemonic)
        toast('Copied!', { type: 'success' })
      }}
    >
      Copy Seed Phrase
    </Button>
  </ContainerWithDispersedContent>
)


export { CopySeedPhrase }
