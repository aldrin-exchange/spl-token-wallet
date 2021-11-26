import React from 'react'
import { useLocation, useNavigate } from 'react-router'

import { BackButton, HeaderContainer } from './Header.styles'
import Arrow from '../../images/basic/arrow.svg'
import { XxlHeader } from '../CommonStyledComponents'

export const Header = ({
  goBack,
  currentStep,
}: {
  goBack: () => void;
  currentStep: number;
}) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isWelcomePage = pathname === '/welcome'

  return !isWelcomePage ? (
    <HeaderContainer>
      <BackButton
        onClick={() => {
          if (currentStep === 1) {
            navigate(-1)
          } else {
            goBack()
          }
        }}
      >
        <img src={Arrow} alt="back" width="13px" />
        Back
      </BackButton>
      <XxlHeader>Create Wallet</XxlHeader>
    </HeaderContainer>
  ) : null
}
