import React from 'react'
import { useLocation } from 'react-router'
import { Wrapper } from './commonStyledComponents/Containers'


export const WrapperContainer = ({ children }:{ children: React.ReactNode }) => {
  const { pathname } = useLocation()
  const isWelcomePage = pathname === '/welcome'
  const isRestorePage = pathname === '/restore'
  const isCreatePage = pathname === '/create'

  const needOpacity = !isWelcomePage && !isRestorePage && !isCreatePage

  return <Wrapper needOpacity={needOpacity}>{children}</Wrapper>
}
