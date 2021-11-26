import React from 'react'
import {
  Button,
  ContainerWithDispersedContent,
  TextContainer,
  YellowHintBlock,
} from '../../components/CommonStyledComponents'
import { FONTS } from '../../components/variables'

const CreateWallet = () => (
  <ContainerWithDispersedContent>
    <YellowHintBlock>
      Protect your wallet by saving your Secret Seed Phrase in a place you
      trust.
      <span style={{ fontFamily: FONTS.bd }}>
        {' '}
        It’s the only way to recover your wallet if you get locked out of the
        app or get a new device.
      </span>
    </YellowHintBlock>
    <TextContainer>a</TextContainer>
    <Button>Confirm</Button>
  </ContainerWithDispersedContent>
)

export { CreateWallet }
