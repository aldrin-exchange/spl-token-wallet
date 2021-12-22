import React, { lazy, Suspense, useMemo } from 'react'
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {
  Container,
  InnerWrapper,
} from './components/commonStyledComponents/Containers'
import { WrapperContainer } from './components/Wrapper'

import 'react-toastify/dist/ReactToastify.css'
import { WalletProvider } from './utils/wallet'
import { ConnectionProvider } from './utils/connection'
import { TokenRegistryProvider } from './utils/tokens/names'
import { useHasLockedMnemonicAndSeed } from './utils/wallet-seed'
// import { Header } from './components/Header/Header'
// import { Navbar } from './components/Navbar/Navbar'

const Welcome = lazy(() => import('./routes/Welcome').then((module) => ({
  default: module.WelcomeRoute,
})))
const WelcomeBack = lazy(() => import('./routes/WelcomeBack').then((module) => ({
  default: module.WelcomeBackRoute,
})))
const CreateWallet = lazy(() => import('./routes/CreateWallet').then((module) => ({
  default: module.CreateWalletRoute,
})))
const RestoreWallet = lazy(() => import('./routes/RestoreWallet').then((module) => ({
  default: module.RestoreWalletRoute,
})))
const Wallet = lazy(() => import('./routes/Wallet').then((module) => ({
  default: module.WalletRoute,
})))
const ManageTokens = lazy(() => import('./routes/ManageTokens').then((module) => ({
  default: module.ManageTokensRoute,
})))
const Deposit = lazy(() => import('./routes/Deposit').then((module) => ({
  default: module.DepositRoute,
})))
const Withdraw = lazy(() => import('./routes/Withdraw').then((module) => ({
  default: module.WithdrawRoute,
})))
const LogOut = lazy(() => import('./routes/LogOut').then((module) => ({
  default: module.LogOutRoute,
})))
const ExportSeedPhrase = lazy(() => import('./routes/ExportSeed').then((module) => ({
  default: module.ExportSeedRoute,
})))
const SyncWithApp = lazy(() => import('./routes/SyncWithApp').then((module) => ({
  default: module.SyncWithAppRoute,
})))


// const LOCAL_BUILD = window.location.href.includes('localhost');
export const Pages = () => {
  const [hasLockedMnemonicAndSeed] = useHasLockedMnemonicAndSeed()

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
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/welcome_back" element={<WelcomeBack />} />
      <Route path="/create" element={<CreateWallet />} />
      <Route path="/restore" element={<RestoreWallet />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/manage_tokens" element={<ManageTokens />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/log_out" element={<LogOut />} />
      <Route path="/export_seed" element={<ExportSeedPhrase />} />
      <Route path="/sync" element={<SyncWithApp />} />
      {/* if have mnemonic in localstorage - login, otherwise - restore/import/create */}
      {hasLockedMnemonicAndSeed ? (
        <Route
          path="/"
          element={<Navigate to="/welcome_back" />}
        />
      ) : (
        <Route
          path="/"
          element={<Navigate to="/welcome" />}
        />
      )}

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
        <WrapperContainer>
          <InnerWrapper>
            <Suspense fallback={<div>Loading...</div>}>
              {/* <Header /> */}
              <ConnectionProvider>
                <TokenRegistryProvider>
                  <WalletProvider>
                    <Pages />
                  </WalletProvider>
                </TokenRegistryProvider>
              </ConnectionProvider>
              <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              {/* <Navbar /> */}
            </Suspense>
          </InnerWrapper>
        </WrapperContainer>
      </Container>
    </BrowserRouter>
  )
}
