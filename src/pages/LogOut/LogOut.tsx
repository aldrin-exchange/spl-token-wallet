import React, { useState } from 'react'
import { Button } from '../../components/commonStyledComponents/Buttons'
import {
  ColumnWithLeftSideContent,
  ContainerWithDispersedContent,
} from '../../components/commonStyledComponents/Containers'
import {
  ErrorHintBlock, LgTitle, ThinMdDescription,
} from '../../components/commonStyledComponents/Text'
import { Header } from '../../components/Header/Header'
import { TextArea } from '../../components/Inputs/Input.styles'
import { Navbar } from '../../components/Navbar/Navbar'
import { COLORS } from '../../components/variables'

export const LogOut = () => {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <>
      <Header
        title="Log Out"
        currentStep={currentStep}
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      <ContainerWithDispersedContent margin="4rem 0">
        <ColumnWithLeftSideContent>
          <LgTitle>Enter your Seed Phrase to Log Out</LgTitle>
        </ColumnWithLeftSideContent>
        <TextArea
          margin="0"
          value="Tinker Tailor Soldier Tinker Tailor Soldier Tinker Tailor
                           Soldier Tinker Tailor Soldier Tinker Tailor Soldier Tinker
                           Tailor Soldier Tinker Tailor Soldier Tinker Tailor Soldier"
        />
        <ErrorHintBlock red={false}>
          <LgTitle>Never lose your Seed Phrase!</LgTitle>
          <ThinMdDescription>Without it, you will not be able to regain access to your wallet.</ThinMdDescription>
        </ErrorHintBlock>
        <Button background={COLORS.orange}>Log Out</Button>
      </ContainerWithDispersedContent>
      <Navbar
        submit={() => {}}
        disabled={false}
      />
    </>
  )
}
