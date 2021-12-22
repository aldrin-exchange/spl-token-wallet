/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, SquareButton, StyledLink } from '../../components/commonStyledComponents/Buttons'
import {
  ContainerWithDispersedContent, RowWithStrechedContent, ColumnWithTopContent, TransparentContainer, Row, AnimatedButtonsContainer,
} from '../../components/commonStyledComponents/Containers'
import {
  XxlHeader, ThinGreenText, LgTitle, MdDescription,
} from '../../components/commonStyledComponents/Text'
import { Header } from '../../components/Header/Header'
import { Navbar } from '../../components/Navbar/Navbar'
import { Radio } from '../../components/Radio/Radio'
// import { Radio } from '../../components/Radio/Radio'
import { Switcher } from '../../components/Switcher/Switcher'
import { COLORS, FONT_SIZES } from '../../components/variables'
import { RIN_MINT } from '../../utils/config'
import { useConnection } from '../../utils/connection'
import { useTokenInfosMap } from '../../utils/tokens/names'
import { TokensDataSingleton } from '../../utils/TokensDataSingleton'
import {
  useInterval, getAllTokensData, isUSDToken, formatSymbol, stripDigitPlaces,
} from '../../utils/utils'
import { useBalanceInfo, useWallet } from '../../utils/wallet'
// eslint-disable-next-line import/no-cycle
import { AssetRow } from './AssetRow'
import DotsIcon from '../../images/basic/dots.svg'
import Arrow from '../../images/basic/arrow.svg'
import CrossedEye from '../../images/basic/crossedEye.svg'
import PencilIcon from '../../images/basic/pencil.svg'
import PrivateKeyIcon from '../../images/basic/privateKey.svg'

export interface TokenInfo {
  symbol: string
  amount: number
  decimals: number
  mint: string
  address: string
  name: string;
  tokenLogoUri: string
}

export const Wallet = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const wallet = useWallet()
  // const [selectedTokenData, selectToken] = useState<{
  //   publicKey: PublicKey;
  //   isAssociatedToken: boolean;
  // }>({
  //   publicKey: wallet.publicKey,
  //   isAssociatedToken: false,
  // })
  const [chosenAccount, setChosenAccount] = useState('')

  const connection = useConnection()
  const tokenInfosMap = useTokenInfosMap()
  const [refreshCounter, changeRefreshCounter] = useState(0)
  const [tokensData, setTokensData] = useState<Map<string, number>>(new Map())
  const [allTokensData, setAllTokensData] = useState<Map<string, TokenInfo>>(
    new Map(),
  )

  const walletPubkey = wallet?.publicKey?.toString()
  const refreshTokensData = () => changeRefreshCounter(refreshCounter + 1)
  // const isTokenSelected = allTokensData.get(selectedTokenData.publicKey.toString())
  //   && selectedTokenData.publicKey

  useInterval(refreshTokensData, 5 * 1000)
  useEffect(() => {
    const getData = async () => {
      const data = await TokensDataSingleton.getData()
      const allTokensInfo = await getAllTokensData(
        new PublicKey(walletPubkey),
        connection,
        tokenInfosMap,
      )

      setTokensData(data)
      // @ts-ignore
      setAllTokensData(allTokensInfo)
    }

    if (walletPubkey) getData()
  }, [
    connection,
    walletPubkey,
    // eslint-disable-next-line no-unsafe-optional-chaining
    // JSON.stringify([...tokenInfosMap?.entries()]),
    refreshCounter,
  ])

  const balanceInfo = useBalanceInfo()

  const sortedPublicKeys = useMemo(
    () => [...allTokensData.values()].sort((tokenA, tokenB) => {
      if ((!tokenA && !tokenB) || !walletPubkey) return 0
      if (!tokenA) return 1
      if (!tokenB) return -1

      const isTokenAUSDT = isUSDToken(tokenA.symbol)
      const isTokenBUSDT = isUSDToken(tokenB.symbol)

      let tokenAPrice = tokensData.get(`${tokenA.symbol}`) || 0
      if (isTokenAUSDT) tokenAPrice = 1
      let tokenBPrice = tokensData.get(`${tokenB.symbol}`) || 0
      if (isTokenBUSDT) tokenBPrice = 1

      const aVal = tokenA.amount * tokenAPrice
      const bVal = tokenB.amount * tokenBPrice

      // SOL always fisrt
      if (new PublicKey(tokenA.address).equals(new PublicKey(walletPubkey))) return -1
      if (new PublicKey(tokenB.address).equals(new PublicKey(walletPubkey))) return 1

      // RIN always second
      if (new PublicKey(tokenA.mint).equals(RIN_MINT)) return -1
      if (new PublicKey(tokenB.mint).equals(RIN_MINT)) return 1

      const totalA = aVal === undefined || aVal === null ? -1 : aVal
      const totalB = bVal === undefined || bVal === null ? -1 : bVal

      if (totalB < totalA) {
        return -1
      } if (totalB > totalA) {
        return 1
      }
      return tokenA.symbol.localeCompare(tokenB.symbol)
    }),
    [allTokensData, walletPubkey, tokensData],
  )


  const totalBalance = sortedPublicKeys.reduce((acc, current) => {
    const closePrice = tokensData?.get(`${current.symbol.toUpperCase()}`) || 0

    let priceForCalculate = closePrice

    if (isUSDToken(current.symbol)) {
      priceForCalculate = 1
    }

    let usdValue

    if (priceForCalculate === undefined) {
      usdValue = undefined
    } else if (priceForCalculate === null) {
      usdValue = null
    } else { usdValue = +(current.amount * priceForCalculate).toFixed(2) }


    return acc + usdValue
  }, 0) || '--'

  const walletPubKey = wallet?.publicKey.toString() || '--'


  return (
    <>
      <Header
        walletPubKey={walletPubKey}
        title="Main Account"
        currentStep={currentStep}
        currentPage="wallet"
        goBack={() => setCurrentStep(currentStep - 1)}
        goNext={() => setCurrentStep(currentStep + 1)}
      />
      {currentStep === 1 && (
      <ContainerWithDispersedContent>
        <RowWithStrechedContent>
          <XxlHeader>
            $
            {stripDigitPlaces(totalBalance, 2)}
          </XxlHeader>
          <ThinGreenText>+0.00</ThinGreenText>
        </RowWithStrechedContent>
        <RowWithStrechedContent>
          <StyledLink to="/deposit" width="48%">Deposit</StyledLink>
          <StyledLink to="/withdraw" width="48%" background={COLORS.orange}>Send</StyledLink>
        </RowWithStrechedContent>
        <Switcher />

        <ColumnWithTopContent width="100%" height="21rem">
          {sortedPublicKeys.map((el) => (
            <TransparentContainer>
              <AssetRow el={el} wallet={wallet} balanceInfo={balanceInfo} tokensData={tokensData} />
            </TransparentContainer>
          ))}
        </ColumnWithTopContent>
        <StyledLink to="/manage_tokens">Manage Token List</StyledLink>
      </ContainerWithDispersedContent>
      )}
      {currentStep === 2 && (
      <ContainerWithDispersedContent>
        <RowWithStrechedContent>
          <LgTitle>Your Accounts</LgTitle>
          <ThinGreenText fontSize={FONT_SIZES.rg}>Show Archived</ThinGreenText>
        </RowWithStrechedContent>
        <ColumnWithTopContent width="100%" height="30rem">
          <ColumnWithTopContent width="100%" height="21rem" margin="0 0 2rem 0">
            {sortedPublicKeys.map((el, index) => {
              const closePrice = tokensData?.get(`${el.symbol.toUpperCase()}`) || 0
              const amountUsd = closePrice * el.amount
              const isAccountChosen = chosenAccount === el.address
              return (

                <Row width="100%" justify="space-between" style={{ position: 'relative' }}>
                  <TransparentContainer
                    style={{ height: '4rem' }}
                    // @ts-ignore
                    isOptionsOpen={isAccountChosen}
                  >
                    <RowWithStrechedContent style={{ maxHeight: '4rem' }}>
                      <Row>
                        <Radio checked={el.address === walletPubKey} />
                        <Row height="100%" direction="column" align="flex-start" justify="space-between">
                          <LgTitle>{index}</LgTitle>
                          <ThinGreenText>{formatSymbol(el.address)}</ThinGreenText>
                        </Row>
                      </Row>
                      <Row height="100%" direction="row" align="center" justify="flex-end">
                        <LgTitle margin="0 1rem 0 0">
                          $
                          {stripDigitPlaces(amountUsd, 2)}
                        </LgTitle>
                        <img
                          src={isAccountChosen ? Arrow : DotsIcon}
                          style={{ transform: isAccountChosen ? 'rotate(180deg)' : 'none', cursor: 'pointer' }}
                          alt="menu"
                          width="22px"
                          onClick={() => {
                            if (chosenAccount === '') {
                              setChosenAccount(el.address)
                            } else {
                              setChosenAccount('')
                            }
                          }}
                        />
                      </Row>
                    </RowWithStrechedContent>
                  </TransparentContainer>
                  <AnimatedButtonsContainer
                    // @ts-ignore
                    isOptionsOpen={isAccountChosen}
                  >
                    <SquareButton>
                      <Row direction="column">
                        <img width="15px" src={PencilIcon} alt="edit" />
                        <MdDescription>Rename</MdDescription>
                      </Row>
                    </SquareButton>

                    <SquareButton background={COLORS.orange}>
                      <Row direction="column">
                        <img width="15px" src={CrossedEye} alt="archive" />
                        <MdDescription>Archive</MdDescription>
                      </Row>

                    </SquareButton>
                    <SquareButton background={COLORS.background}>
                      <Row direction="column">
                        <img width="20px" src={PrivateKeyIcon} alt="export key" />
                        <MdDescription>Private Key</MdDescription>
                      </Row>

                    </SquareButton>
                  </AnimatedButtonsContainer>
                </Row>
              )
            })}
          </ColumnWithTopContent>
          <Button>Create Additional Account</Button>
        </ColumnWithTopContent>
        <StyledLink to="/export_seed">Show Secret Seed Phrase</StyledLink>
        <StyledLink to="/log_out" background={COLORS.orange}>Log out</StyledLink>
      </ContainerWithDispersedContent>
      )}
      <Navbar
        needLinks
        disabled={false}
      />
    </>
  )
}
