import React, { useState } from 'react'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'
import { SmallRoundButton, Button } from '../../components/commonStyledComponents/Buttons'
import {
  ColumnWithLeftSideContent, ContainerWithDispersedContent, TextContainer,
} from '../../components/commonStyledComponents/Containers'
import { LgTitle, YellowHintBlock } from '../../components/commonStyledComponents/Text'
import { Header } from '../../components/Header/Header'
import { InputWithEye } from '../../components/Inputs/Input'
import { Navbar } from '../../components/Navbar/Navbar'
import { FONT_SIZES } from '../../components/variables'
import { checkIsCorrectPassword, useUnlockedMnemonicAndSeed } from '../../utils/wallet-seed'
import { useCallAsync } from '../../utils/notifications'
// import { useWallet } from '../../utils/wallet'

export const ExportSeedPhrase = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // const [keyOutput, setKeyOutput] = useState('')

  // const wallet = useWallet()

  const [unlockedMnemonic] = useUnlockedMnemonicAndSeed()

  // @ts-ignore
  const mnemonic = unlockedMnemonic?.mnemonic?.split(' ') || '0'

  const callAsync = useCallAsync()

  const submit = () => {
    callAsync(checkIsCorrectPassword(password), {
      progressMessage: null,
      successMessage: null,
      onSuccess: () => {
        toast('Success!', { type: 'success' })
        // setKeyOutput(`[${Array.from(wallet.provider.account.secretKey)}]`)
      },
      onError: () => { toast('Error!', { type: 'error' }) },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      submit()
      setCurrentStep(2)
    }
  }

  return (
    <>
      <Header
        title="Export Seed Phrase"
        currentStep={currentStep}
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      {currentStep === 1 && (
      <ContainerWithDispersedContent>
        <ColumnWithLeftSideContent>
          <LgTitle>Enter Password to Unlock Seed Phrase</LgTitle>
          <InputWithEye
            onKeyDown={handleKeyDown}
            action={() => setShowPassword(!showPassword)}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </ColumnWithLeftSideContent>
      </ContainerWithDispersedContent>
      )}
      {currentStep === 2 && (
      <ContainerWithDispersedContent>
        <YellowHintBlock>
          Do not share your Seed Phrase with anyone!
        </YellowHintBlock>
        <TextContainer needBorder>
          {mnemonic.map((word) => (
            <SmallRoundButton fontSize={word.length >= 6 ? FONT_SIZES.md : FONT_SIZES.rg}>
              {word}
            </SmallRoundButton>
          ))}

        </TextContainer>
        <Button
          onClick={() => {
            copy(mnemonic)
            toast('Copied!', { type: 'success' })
          }}
        >
          Copy Seed Phrase
        </Button>
      </ContainerWithDispersedContent>
      )}
      <Navbar
        needLinks
        disabled={false}
      />
    </>
  )
}
