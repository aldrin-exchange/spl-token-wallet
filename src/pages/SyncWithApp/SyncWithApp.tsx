import React, { useState } from 'react'
import QRCode from 'react-qr-code'

import {
  ContainerWithDispersedContent,
} from '../../components/commonStyledComponents/Containers'
import { YellowHintBlock } from '../../components/commonStyledComponents/Text'
import { Header } from '../../components/Header/Header'
import { Navbar } from '../../components/Navbar/Navbar'
import { useUnlockedMnemonicAndSeed } from '../../utils/wallet-seed'
// import QrCode from '../../images/basic/qrcodemock.png'

export const SyncWithApp = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [unlockedMnemonic] = useUnlockedMnemonicAndSeed()

  // @ts-ignore
  return (
    <>
      <Header
        title="Sync with App"
        currentStep={currentStep}
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      <ContainerWithDispersedContent>
        <YellowHintBlock>Do not share this QR code with anyone!</YellowHintBlock>
        <QRCode
          // @ts-ignore
          value={unlockedMnemonic?.mnemonic || '0'}
          size={135}
        />
      </ContainerWithDispersedContent>
      <Navbar
        needLinks
        disabled={false}
      />
    </>
  )
}
