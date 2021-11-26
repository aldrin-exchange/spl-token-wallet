import React from 'react'
import { useLocation } from 'react-router'
import { BackButton, HeaderContainer } from './Header.styles'
import Arrow from '../../images/basic/arrow.svg'
import { XxlHeader } from '../CommonStyledComponents'

export const Header = () => {
  const { pathname } = useLocation()
  const isWelcomePage = pathname === '/welcome'

  return !isWelcomePage ? (
    <HeaderContainer>
      <BackButton>
        <img src={Arrow} alt="back" width="13px" />
        Back
      </BackButton>
      <XxlHeader>Create Wallet</XxlHeader>
    </HeaderContainer>
  ) : null
}
