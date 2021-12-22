import React, { useState } from 'react'
import copy from 'clipboard-copy'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import { Button } from '../../components/commonStyledComponents/Buttons'
import {
  ContainerWithDispersedContent,
} from '../../components/commonStyledComponents/Containers'
import { YellowHintBlock } from '../../components/commonStyledComponents/Text'
import { Header } from '../../components/Header/Header'
import { Input } from '../../components/Inputs/Input.styles'
import { Navbar } from '../../components/Navbar/Navbar'
import { useWallet } from '../../utils/wallet'

export const Deposit = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const wallet = useWallet()
  return (
    <>
      <Header
        title="Deposit"
        currentStep={currentStep}
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      <ContainerWithDispersedContent>
        <QRCode value={wallet?.publicKey?.toString()} size={135} />
        <Input
          value={wallet?.publicKey?.toString()}
          onClick={() => {
            copy(wallet?.publicKey?.toString())
            toast('Copied!', { type: 'success' })
          }}
        />
        <Button onClick={() => {
          copy(wallet?.publicKey?.toString())
          toast('Copied!', { type: 'success' })
        }}
        >
          Copy Deposit Address
        </Button>
        <YellowHintBlock>You can use this address to receive any SPL (Solana) token. Do not send funds using another Network (e.g. ERC20, BSC etc.)</YellowHintBlock>
      </ContainerWithDispersedContent>
      <Navbar
        needLinks
        disabled={false}
      />
    </>
  )
}
