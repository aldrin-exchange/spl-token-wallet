import React, { lazy, Suspense, useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, Wrapper } from './components/CommonStyledComponents'

const Welcome = lazy(() => import('./routes/Welcome').then((module) => ({
  default: module.WelcomeRoute,
})))
const CreateWallet = lazy(() => import('./routes/CreateWallet').then((module) => ({
  default: module.CreateWalletRoute,
})))

// const LOCAL_BUILD = window.location.href.includes('localhost');

export const Pages = () => {
  useMemo(() => {
    const params = new URLSearchParams(window.location.hash.slice(1))
    const origin = params.get('origin')
    const { hash } = window.location

    if (origin) {
      sessionStorage.setItem('origin', origin)
    } else {
      sessionStorage.removeItem('origin')
    }

    if (hash) {
      sessionStorage.setItem('hash', hash)
    } else {
      sessionStorage.removeItem('hash')
    }
  }, [])


  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/create" element={<CreateWallet />} />
      {/* popup if connecting from dex UI */}
      {/* {window.opener && !!wallet && <Redirect from="/" to="/connect_popup" />} */}

      {/* if wallet exists - for case when we'll have unlocked wallet */}
      {/* {!!wallet && <Redirect from="/" to="/wallet" />} */}

      {/* if have mnemonic in localstorage - login, otherwise - restore/import/create */}
    </Routes>
  )
}

export const App = () => {
  // Disallow rendering inside an iframe to prevent clickjacking.
  if (window.self !== window.top) {
    return null
  }
  return (
    <BrowserRouter>
      <Container>
        <Wrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <Pages />
          </Suspense>
        </Wrapper>
      </Container>
    </BrowserRouter>
  )
}
