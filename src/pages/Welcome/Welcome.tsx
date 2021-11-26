import React from 'react'
import {
  ContainerWithCenteredContent,
  RowWithStrechedContent,
  LgTitle,
  VioletBox,
  MdDescription,
  RowWithCenteredContent,
} from '../../components/CommonStyledComponents'

import Logo from '../../images/logotypes/Logo.svg'
import Plus from '../../images/basic/plus.svg'
import Restore from '../../images/basic/restore.svg'

export const Welcome = () => (
  <ContainerWithCenteredContent>
    <LgTitle margin="1rem 0 2rem 0">Welcome to</LgTitle>
    <img src={Logo} alt="logo" width="160px" />
    <RowWithStrechedContent margin="12rem 0 0 0">
      <VioletBox to="/">
        <img src={Restore} alt="restore" width="40px" />
        <RowWithCenteredContent>
          <LgTitle>Restore Wallet</LgTitle>
          <MdDescription>with Seed Phrase</MdDescription>
        </RowWithCenteredContent>
      </VioletBox>
      <VioletBox to="/create">
        <img src={Plus} alt="create" width="40px" />
        <LgTitle margin="1rem 0 2rem">Create Wallet</LgTitle>
      </VioletBox>
    </RowWithStrechedContent>
  </ContainerWithCenteredContent>
)
