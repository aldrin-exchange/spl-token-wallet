/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
import { validateMnemonic } from 'bip39'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  ContainerWithDispersedContent, ColumnWithLeftSideContent, ColumnWithTopContent,
} from '../../components/commonStyledComponents/Containers'
import { LgTitle } from '../../components/commonStyledComponents/Text'
import { Header } from '../../components/Header/Header'
import { InputWithEye, InputWithTitle } from '../../components/Inputs/Input'
import { TextArea } from '../../components/Inputs/Input.styles'
import { Navbar } from '../../components/Navbar/Navbar'
import { useCallAsync } from '../../utils/notifications'
import { mnemonicToSeed, storeMnemonicAndSeed } from '../../utils/wallet-seed'
import { DERIVATION_PATH, getAccountFromSeed } from '../../utils/walletProvider/localStorage'
import { AccountItem } from './AccountItem'

const DerivationPathMenuItem = {
  Deprecated: 0,
  Bip44: 1,
  Bip44Change: 2,
}

function toDerivationPath(dPathMenuItem: number) {
  switch (dPathMenuItem) {
    case DerivationPathMenuItem.Deprecated:
      return DERIVATION_PATH.deprecated
    case DerivationPathMenuItem.Bip44:
      return DERIVATION_PATH.bip44
    case DerivationPathMenuItem.Bip44Change:
      return DERIVATION_PATH.bip44Change
    default:
      throw new Error(`invalid derivation path: ${dPathMenuItem}`)
  }
}

export const RestoreWallet = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [mnemonic, setMnemonic] = useState('')
  const [seed, setSeed] = useState('')
  const [, setForceUpdate] = useState(false)
  const callAsync = useCallAsync()


  const isMnemonicCorrect = validateMnemonic(mnemonic)
  const isDisabled = !isMnemonicCorrect || password === ''

  const submit = () => {
    mnemonicToSeed(mnemonic).then((seed) => {
      setSeed(seed)
    })
  }

  async function submitAccounts() {
    await callAsync(
      storeMnemonicAndSeed({
        mnemonic,
        seed,
        password,
        derivationPath: toDerivationPath(DerivationPathMenuItem.Bip44Change),
      }),
    )
  }

  const accounts = [...Array(10)].map((_, idx) => getAccountFromSeed(
    Buffer.from(seed, 'hex'),
    idx,
    // @ts-ignore
    toDerivationPath(DerivationPathMenuItem.Bip44Change),
  ))

  const navigate = useNavigate()

  return (
    <>
      <Header
        title={currentStep === 1 ? 'Restore Wallet' : 'Import Accounts'}
        currentStep={currentStep}
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      {currentStep === 1 && (
      <ContainerWithDispersedContent>
        <ColumnWithLeftSideContent>
          <LgTitle>Enter your Seed Phrase</LgTitle>
          <TextArea onChange={(e) => setMnemonic(e.target.value)} placeholder="Enter your Seed Phrase" />
        </ColumnWithLeftSideContent>
        <ColumnWithLeftSideContent>
          <LgTitle>Create password</LgTitle>
          <InputWithEye
            action={() => setShowPassword(!showPassword)}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </ColumnWithLeftSideContent>
        <ColumnWithLeftSideContent>
          <LgTitle>Lock wallet after</LgTitle>
          <InputWithTitle placeholder="60" />
        </ColumnWithLeftSideContent>
      </ContainerWithDispersedContent>
      )}
      {currentStep === 2 && (
      <ContainerWithDispersedContent>
        <LgTitle margin="2rem 0 3rem 0">
          Choose Wallet Accounts to Import
        </LgTitle>
        <ColumnWithTopContent width="100%">
          {accounts.map((acc) => (
            <AccountItem publicKey={acc.publicKey} setForceUpdate={setForceUpdate} />
          ))}
        </ColumnWithTopContent>
      </ContainerWithDispersedContent>
      )}
      <Navbar
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        submit={async () => {
          if (currentStep === 1) {
            submit()
          }

          if (currentStep === 2) {
            await submitAccounts()
            await navigate('/wallet')
          }
          await setCurrentStep(currentStep + 1)
        }}
        disabled={isDisabled}
      />
    </>
  )
}
