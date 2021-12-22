import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Navbar } from '../../components/Navbar/Navbar'
import { Header } from '../../components/Header/Header'
import { CreatePassword } from './components/CreatePassword'
import { SaveSeedPhrase } from './components/SaveSeedPhrase'
import { CopySeedPhrase } from './components/CopySeedPhrase'
import { shuffleArray } from '../../utils/utils'
import { generateMnemonicAndSeed, storeMnemonicAndSeed, useHasLockedMnemonicAndSeed } from '../../utils/wallet-seed'
import { DERIVATION_PATH } from '../../utils/walletProvider/localStorage'
import { useCallAsync } from '../../utils/notifications'

const CreateWallet = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [savedSeedWords, setSavedSeedWords] = useState<string[]>([])
  const [password, setPassword] = useState('')
  const [randomlyPlacedSeedWords, updateRandomlyPlacedSeedWords] = useState<
  string[]
  >([])

  const [mnemonicAndSeed, setMnemonicAndSeed] = useState<{
    mnemonic: string;
    seed: string;
  }>({ mnemonic: '', seed: '' })

  const [hasLockedMnemonicAndSeed] = useHasLockedMnemonicAndSeed()

  const navigate = useNavigate()

  useEffect(() => {
    if (hasLockedMnemonicAndSeed) {
      navigate('/welcome_back')
    }
    generateMnemonicAndSeed().then((seedAndMnemonic) => {
      setMnemonicAndSeed(seedAndMnemonic)
    })
  }, [])

  useEffect(() => {
    const seedPhraseArray = mnemonicAndSeed.mnemonic.split(' ')

    setSavedSeedWords([])
    updateRandomlyPlacedSeedWords(shuffleArray(seedPhraseArray))
  }, [mnemonicAndSeed.mnemonic])

  const callAsync = useCallAsync()

  const submit = async () => {
    if (mnemonicAndSeed && password !== '') {
      const { mnemonic, seed } = mnemonicAndSeed
      await callAsync(
        storeMnemonicAndSeed({
          mnemonic,
          seed,
          password,
          derivationPath: DERIVATION_PATH.bip44Change,
        }),
        {
          progressMessage: 'Creating wallet...',
          successMessage: 'Wallet created',
          onError: () => {},
          onSuccess: () => {},
        },
      )
    }
  }

  const isDisabled = savedSeedWords.join(' ') !== mnemonicAndSeed.mnemonic

  return (
    <>
      <Header
        currentStep={currentStep}
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      {currentStep === 1 && (
      <CopySeedPhrase mnemonicAndSeed={mnemonicAndSeed} />
      )}
      {currentStep === 2 && (
      <SaveSeedPhrase
        savedSeedWords={savedSeedWords}
        randomlyPlacedSeedWords={randomlyPlacedSeedWords}
        updateRandomlyPlacedSeedWords={updateRandomlyPlacedSeedWords}
        setSavedSeedWords={setSavedSeedWords}
        mnemonicAndSeed={mnemonicAndSeed}
      />
      )}
      {currentStep === 3 && (
      <CreatePassword setPassword={setPassword} password={password} />
      )}
      <Navbar
        submit={() => {
          if (currentStep === 1) {
            setCurrentStep(currentStep + 1)
          } else if (currentStep === 2) {
            submit()
            setCurrentStep(currentStep + 1)
          } else {
            submit()
            navigate('/wallet')
          }
        }}
        disabled={currentStep === 2 ? !isDisabled : false}
      />
    </>
  )
}

export { CreateWallet }
