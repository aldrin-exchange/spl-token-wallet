import React from 'react'
import { useLocation } from 'react-router'
import { InnerWrapper as Wrapper } from './CommonStyledComponents'

export const InnerWrapper = (children) => {
  const { pathname } = useLocation()
  const isWelcomePage = pathname === '/welcome'

  return <Wrapper needHeader={!isWelcomePage}>{children}</Wrapper>
}
