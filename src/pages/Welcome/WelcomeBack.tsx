import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ContainerWithCenteredContent, ColumnWithLeftSideContent } from '../../components/commonStyledComponents/Containers'
import { LgTitle } from '../../components/commonStyledComponents/Text'
import { InputWithEye } from '../../components/Inputs/Input'
import { Navbar } from '../../components/Navbar/Navbar'

import Logo from '../../images/logotypes/Logo.svg'
import { useCallAsync } from '../../utils/notifications'
import { loadMnemonicAndSeed } from '../../utils/wallet-seed'

export const WelcomeBack = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [stayLoggedIn] = useState(true)

  const navigate = useNavigate()
  const callAsync = useCallAsync()

  const submit = () => {
    callAsync(loadMnemonicAndSeed(password, stayLoggedIn), {
      progressMessage: null,
      successMessage: null,
      onSuccess: () => { toast('Successfully logged in!', { type: 'success' }) },
      onError: () => { toast('Error log in!', { type: 'error' }) },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      submit()
      navigate('/wallet')
    }
  }


  return (
    <>
      <ContainerWithCenteredContent>
        <LgTitle margin="1rem 0 2rem 0">Welcome back to</LgTitle>
        <img src={Logo} alt="logo" width="160px" />
        <ColumnWithLeftSideContent margin="10rem 0 0 0">
          <LgTitle>Enter password</LgTitle>
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
      </ContainerWithCenteredContent>
      <Navbar
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        submit={async () => {
          submit()
          await navigate('/wallet')
        }}
        disabled={password === ''}
      />
    </>
  )
}
