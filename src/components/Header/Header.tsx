/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React from 'react'
import { useNavigate } from 'react-router'

import { BackButton, HeaderContainer } from './Header.styles'
import Arrow from '../../images/basic/arrow.svg'

import MenuIcon from '../../images/basic/menu.svg'
import CloseIcon from '../../images/basic/close.svg'
import GearIcon from '../../images/basic/gear.svg'
import GqIcon from '../../images/basic/qrIcon.svg'

import { Row } from '../commonStyledComponents/Containers'
import { XxlHeader, ThinGreenText } from '../commonStyledComponents/Text'
import { SmallVioletButton } from '../commonStyledComponents/Buttons'
import { formatSymbol } from '../../utils/utils'

export const Header = ({
  goBack,
  currentStep,
  title = 'Create Wallet',
  goNext = () => {},
  walletPubKey,
  currentPage,
}: {
  goBack: () => void;
  currentStep: number;
  title?: string;
  goNext?: () => void
  walletPubKey?: any
  currentPage?: string
}) => {
  const navigate = useNavigate()

  return (
    <>
      {currentPage === 'wallet' ? (
        <HeaderContainer>
          <Row direction="column" align="flex-start" justify="space-between">
            <XxlHeader margin="0 0 1rem 0">{title}</XxlHeader>
            <ThinGreenText>
              {formatSymbol(walletPubKey)}
            </ThinGreenText>
          </Row>
          <Row>
            <img
              src={currentStep === 1 ? GearIcon : GqIcon}
              alt="settings"
              width="20px"
              style={{ margin: '0 1rem 0 0', cursor: 'pointer' }}
              onClick={() => { navigate('/sync') }}
            />
            <img
              src={currentStep === 1 ? MenuIcon : CloseIcon}
              style={{ cursor: 'pointer' }}
              alt="menu"
              width={currentStep === 1 ? '25px' : '25px'}
              height={currentStep === 1 ? '25px' : '20px'}
              onClick={() => { if (currentStep === 1) { goNext() } else { goBack() } }}
            />
          </Row>
        </HeaderContainer>
      ) : (
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
          {currentPage === 'manage' && currentStep === 2 ? <SmallVioletButton>Confirm 👍</SmallVioletButton> : <XxlHeader>{title}</XxlHeader>}
        </HeaderContainer>
      )}
      {' '}
    </>
  )
}
