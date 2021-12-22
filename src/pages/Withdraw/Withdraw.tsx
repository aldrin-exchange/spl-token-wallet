import React, { useEffect, useMemo, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { Button, StyledLink } from '../../components/commonStyledComponents/Buttons'
import {
  ColumnWithLeftSideContent,
  ColumnWithTopContent,
  ContainerWithDispersedContent, Row, RowWithStrechedContent, TransparentContainer,
} from '../../components/commonStyledComponents/Containers'
import {
  LgTitle, ThinGreenText, XxlHeader,
} from '../../components/commonStyledComponents/Text'
import { Header } from '../../components/Header/Header'
import { InputWithSearch } from '../../components/Inputs/Input'
import { Input } from '../../components/Inputs/Input.styles'
import { Navbar } from '../../components/Navbar/Navbar'
import { COLORS, FONT_SIZES } from '../../components/variables'
import Token from '../../images/basic/tokenmock.svg'
import SuccessIcon from '../../images/basic/success.svg'
import { useWallet } from '../../utils/wallet'
import { RIN_MINT } from '../../utils/config'
import { useConnection } from '../../utils/connection'
import { useTokenInfosMap } from '../../utils/tokens/names'
import { TokensDataSingleton } from '../../utils/TokensDataSingleton'
import { useInterval, getAllTokensData, isUSDToken } from '../../utils/utils'
import { TokenInfo } from '../Wallet/Wallet'
import { useSendTransaction } from '../../utils/notifications'

export const Withdraw = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const connection = useConnection()
  const tokenInfosMap = useTokenInfosMap()
  const [refreshCounter, changeRefreshCounter] = useState(0)
  const [tokensData, setTokensData] = useState<Map<string, number>>(new Map())
  const [allTokensData, setAllTokensData] = useState<Map<string, TokenInfo>>(
    new Map(),
  )
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null)
  const [addressDestination, setAddressDestionation] = useState('')
  const [amountToSend, setAmountToSend] = useState('')

  const wallet = useWallet()
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

      // CCAI always second
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

  // @ts-ignore
  const { decimals, mint: rawMint } = selectedToken || {
    decimals: 0,
    mint: '',
  }
  const mint = rawMint ? new PublicKey(rawMint) : null

  // const defaultAddressHelperText = !mint || mint.equals(WRAPPED_SOL_MINT)
  //   ? 'Enter Solana Address'
  //   : 'Enter SPL token or Solana address'

  const [sendTransaction, sending] = useSendTransaction()
  // const [addressHelperText, setAddressHelperText] = useState(
  //   defaultAddressHelperText,
  // )
  // const [passValidation, setPassValidation] = useState<undefined | boolean>(
  //   undefined,
  // )

  // const [shouldShowOverride, setShouldShowOverride] = useState<
  // undefined | boolean
  // >(undefined)

  // const {
  //   fields,
  //   destinationAddress,
  //   transferAmountString,
  //   validAmount,
  // } = useForm(balanceInfo, addressHelperText, passValidation, 'spl', false)

  // const mintString = mint.toString()

  // useEffect(() => {
  //   (async () => {
  //     if (!destinationAddress) {
  //       setAddressHelperText(defaultAddressHelperText)
  //       setPassValidation(undefined)
  //       setShouldShowOverride(undefined)
  //       return
  //     }
  //     try {
  //       const destinationAccountInfo = await wallet.connection.getAccountInfo(
  //         new PublicKey(destinationAddress),
  //       )
  //       setShouldShowOverride(false)

  //       if (destinationAccountInfo.owner.equals(TOKEN_PROGRAM_ID)) {
  //         const accountInfo = parseTokenAccountData(
  //           destinationAccountInfo.data,
  //         )
  //         if (accountInfo.mint.toBase58() === mintString) {
  //           setPassValidation(true)
  //           setAddressHelperText('Address is a valid SPL token address')
  //         } else {
  //           setPassValidation(false)
  //           setAddressHelperText('Destination address mint does not match')
  //         }
  //       } else {
  //         setPassValidation(true)
  //         setAddressHelperText('Destination is a Solana address')
  //       }
  //     } catch (e) {
  //       console.log(`Received error validating address ${e}`)
  //       setAddressHelperText(defaultAddressHelperText)
  //       setShouldShowOverride(true)
  //       setPassValidation(undefined)
  //     }
  //   })()
  // }, [destinationAddress, wallet, mintString])

  async function makeTransaction() {
    const amount = Math.round(parseFloat(amountToSend) * 10 ** decimals)

    if (!amount || amount <= 0) {
      throw new Error('Invalid amount')
    }
    return wallet.transferToken(
      // @ts-ignore
      new PublicKey(selectedToken.mint),
      new PublicKey(addressDestination),
      amount,
      mint,
      decimals,
      null,
      true,
    )
  }


  // const disabled = shouldShowOverride
  //   ? !overrideDestinationCheck || sending || !validAmount
  //   : sending || !validAmount

  async function onSubmit() {
    return (
      typeof sendTransaction === 'function'
      && await sendTransaction(makeTransaction(), {
        onSuccess: () => {
          refreshTokensData()
        },
        onError: () => {},
      })
    )
  }


  return (
    <>
      <Header
        title={currentStep === 3 ? 'Successfully Sent' : 'Send'}
        currentStep={currentStep}
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      {currentStep === 1 && (
        <ContainerWithDispersedContent>
          <RowWithStrechedContent>
            <InputWithSearch width="90%" action={() => {}} type="text" value="" onChange={() => {}} />
          </RowWithStrechedContent>
          <ColumnWithTopContent height="40rem" width="100%">
            {sortedPublicKeys.map((el) => (
              <TransparentContainer>
                <Row>
                  <img src={Token} alt="" width="30px" style={{ margin: '0 1rem 0 0' }} />
                  <Row height="100%" direction="column" align="flex-start" justify="space-between">
                    <LgTitle>{el.symbol}</LgTitle>
                    <ThinGreenText>{el.amount}</ThinGreenText>
                  </Row>

                </Row>
                <LgTitle onClick={() => {
                  setSelectedToken(el)
                  setCurrentStep(currentStep + 1)
                }}
                >
                  Select
                </LgTitle>
              </TransparentContainer>
            ))}
          </ColumnWithTopContent>
        </ContainerWithDispersedContent>
      )}
      {currentStep === 2 && (
      <ContainerWithDispersedContent margin="4rem 0">
        <ColumnWithLeftSideContent>
          <LgTitle>
            Recipient’s
            {' '}
            Address
          </LgTitle>
          <Input
            type="text"
            value={addressDestination}
            placeholder="e.g. E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp"
            onChange={(e) => {
              setAddressDestionation(e.target.value)
            }}
          />
          {/* <ErrorHintBlock>
            <LgTitle>Wrong Network</LgTitle>
            <ThinMdDescription>Please ensure that the recipients address is in the Solana network.</ThinMdDescription>
          </ErrorHintBlock> */}
        </ColumnWithLeftSideContent>

        <ColumnWithLeftSideContent margin="0">
          <LgTitle>Amount</LgTitle>
          <Input
            type="text"
            value={amountToSend}
            placeholder="100"
            onChange={(e) => {
              setAmountToSend(e.target.value)
            }}
          />
          <RowWithStrechedContent margin="2rem 0 0 0">
            <ThinGreenText>$20,000</ThinGreenText>
            <ThinGreenText>
              <span style={{ color: COLORS.main }}>Gas Fee:</span>
              {' '}
              $0.00005
            </ThinGreenText>
          </RowWithStrechedContent>
        </ColumnWithLeftSideContent>
        <Button
          disabled={sending}
          onClick={async () => {
            await onSubmit()
            setCurrentStep(currentStep + 1)
          }}
        >
          Send 100
          {' '}
          {selectedToken?.symbol}

        </Button>
      </ContainerWithDispersedContent>
      )}
      {currentStep === 3 && (
      <ContainerWithDispersedContent margin="4rem 0">
        <img src={SuccessIcon} alt="success" />
        <XxlHeader margin="0">100 SOL successfully sent to</XxlHeader>
        <ThinGreenText fontSize={FONT_SIZES.rg}>5FbM2CWzq33t1gMaYdxYvm4xVjh39nV8KfgdSt5L2ktH</ThinGreenText>
        <Button>Copy TxID</Button>
        <StyledLink to="/wallet" background={COLORS.background}>Back to home</StyledLink>
      </ContainerWithDispersedContent>
      )}
      <Navbar
        submit={() => {}}
        disabled={false}
      />
    </>
  )
}
