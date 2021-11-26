import React from 'react'
import { useLocation } from 'react-router'
import { Button } from '../CommonStyledComponents'
import { NavbarContainer } from './Navbar.styles'

export const Navbar = () => {
  const { pathname } = useLocation()
  const isWelcomePage = pathname === '/welcome'

  return !isWelcomePage ? (
    <NavbarContainer>
      <Button>Confirm</Button>
    </NavbarContainer>
  ) : null
}
