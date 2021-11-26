import React from 'react'
import {
  Button,
  ContainerWithDispersedContent,
  SmallRoundButton,
  TextContainer,
  YellowHintBlock,
} from '../../components/CommonStyledComponents'
import { COLORS, FONTS } from '../../components/variables'

const CreateWallet = () => {
  // const [currentStep, setCurrentStep] = useState(1)
  const mock = [
    'prefer',
    'retire',
    'arm',
    'bag',
    'text',
    'rather',
    'harvest',
    'riot',
    'include',
    'raise',
    'cry',
    'party',
    'rude',
    'system',
    'oil',
    'rule',
    'dolphin',
    'harbor',
    'ancient',
    'fossil',
    'brain',
    'cousin',
    'peanut',
    'legal',
  ]
  return (
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
      <TextContainer>
        {mock.map((el) => (
          <SmallRoundButton>{el}</SmallRoundButton>
        ))}
      </TextContainer>
      <Button background={COLORS.background} onClick={() => {}}>
        Copy Seed Phrase
      </Button>
    </ContainerWithDispersedContent>
  )
}

export { CreateWallet }
