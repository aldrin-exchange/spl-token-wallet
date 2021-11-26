import React, { useState } from 'react'
import copy from 'clipboard-copy'

import {
  Button,
  ContainerWithDispersedContent,
  LgTitle,
  SmallRoundButton,
  TextContainer,
  YellowHintBlock,
} from '../../components/CommonStyledComponents'
import { COLORS, FONTS } from '../../components/variables'
import createNotification from '../../components/Notify/Notify'
import { Navbar } from '../../components/Navbar/Navbar'
import { Header } from '../../components/Header/Header'

const CreateWallet = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const seedPhrase = [
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
    <>
      <Header
        currentStep={currentStep}
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      {currentStep === 1 && (
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
            {seedPhrase.map((el) => (
              <SmallRoundButton>{el}</SmallRoundButton>
            ))}
          </TextContainer>
          <Button
            background={COLORS.background}
            onClick={() => {
              copy(seedPhrase.join(' '))
              createNotification('info')
            }}
          >
            Copy Seed Phrase
          </Button>
        </ContainerWithDispersedContent>
      )}
      {currentStep === 2 && (
        <ContainerWithDispersedContent>
          <LgTitle>
            Put the words of your Seed Phrase in the right order
          </LgTitle>
          <TextContainer needBorder needOpacity>
            {seedPhrase.map((_, index) => (
              <SmallRoundButton needOpacity>{index + 1}</SmallRoundButton>
            ))}
          </TextContainer>
          <TextContainer>
            {seedPhrase.map((el) => (
              <SmallRoundButton>{el}</SmallRoundButton>
            ))}
          </TextContainer>
        </ContainerWithDispersedContent>
      )}
      <Navbar
        currentStep={currentStep}
        goNext={() => setCurrentStep(currentStep + 1)}
      />
    </>
  )
}

export { CreateWallet }
