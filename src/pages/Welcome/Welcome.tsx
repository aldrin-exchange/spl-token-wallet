import React from 'react'
import Logo from '../../images/logotypes/Logo.svg'
import Plus from '../../images/basic/plus.svg'
import Restore from '../../images/basic/restore.svg'
import { VioletBox } from '../../components/commonStyledComponents/Buttons'
import { ContainerWithCenteredContent, RowWithStrechedContent, ColumnWithCenteredContent } from '../../components/commonStyledComponents/Containers'
import { LgTitle, MdDescription } from '../../components/commonStyledComponents/Text'

export const Welcome = () => (
  <ContainerWithCenteredContent>
    <LgTitle margin="1rem 0 2rem 0">Welcome to</LgTitle>
    <img src={Logo} alt="logo" width="160px" />
    <RowWithStrechedContent margin="12rem 0 0 0">
      <VioletBox to="/restore">
        <img src={Restore} alt="restore" width="40px" />
        <ColumnWithCenteredContent height="5rem">
          <LgTitle>Restore Wallet</LgTitle>
          <MdDescription>with Seed Phrase</MdDescription>
        </ColumnWithCenteredContent>
      </VioletBox>
      <VioletBox to="/create">
        <img src={Plus} alt="create" width="40px" />
        <LgTitle margin="1rem 0 2rem">Create Wallet</LgTitle>
      </VioletBox>
    </RowWithStrechedContent>
  </ContainerWithCenteredContent>
)
