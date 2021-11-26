import React from 'react'
import { useLocation } from 'react-router'
import { Button } from '../CommonStyledComponents'
import { NavbarContainer } from './Navbar.styles'

export const Navbar = ({
  goNext,
  currentStep,
}: {
  goNext: () => void;
  currentStep: number;
}) => {
  const { pathname } = useLocation()
  const isWelcomePage = pathname === '/welcome'

  return !isWelcomePage ? (
    <NavbarContainer>
      <Button onClick={() => goNext()}>
        {currentStep === 1 ? 'Next' : 'Confirm'}
      </Button>
    </NavbarContainer>
  ) : null
}
