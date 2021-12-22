import React, { useState } from 'react'
import { Button } from '../../components/commonStyledComponents/Buttons'
import { Checkbox } from '../../components/commonStyledComponents/Checkbox'
import {
  ContainerWithDispersedContent, ColumnWithTopContent, TransparentContainer, Row, RowWithStrechedContent, ColumnWithLeftSideContent,
} from '../../components/commonStyledComponents/Containers'
import { LgTitle, ThinGreenText } from '../../components/commonStyledComponents/Text'
import { Header } from '../../components/Header/Header'
import { InputWithEye, InputWithSearch } from '../../components/Inputs/Input'
import { Input } from '../../components/Inputs/Input.styles'
import { Navbar } from '../../components/Navbar/Navbar'

export const ManageTokens = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const a = ['5FbM...2ktH', '5FbM...2ktH', '5FbM...2ktH', '5FbM...2ktH', '5FbM...2ktH', '5FbM...2ktH', '5FbM...2ktH']
  return (
    <>
      <Header
        title="Manage Token List"
        currentStep={currentStep}
        currentPage="manage"
        goBack={() => setCurrentStep(currentStep - 1)}
      />
      {currentStep === 1 && (
      <ContainerWithDispersedContent>
        <RowWithStrechedContent>
          <InputWithSearch action={() => {}} type="text" value="" onChange={() => {}} />
          <Button width="40%" onClick={() => setCurrentStep(currentStep + 1)}>Add Custom</Button>
        </RowWithStrechedContent>
        <ColumnWithTopContent height="40rem" width="100%">
          {a.map((el) => (
            <TransparentContainer>
              <RowWithStrechedContent style={{ maxHeight: '4rem' }}>
                <Row height="100%" direction="column" align="flex-start" justify="space-between">
                  <LgTitle>{el}</LgTitle>
                  <ThinGreenText>{el}</ThinGreenText>
                </Row>
                <Checkbox />

              </RowWithStrechedContent>

            </TransparentContainer>
          ))}
        </ColumnWithTopContent>
      </ContainerWithDispersedContent>
      )}
      {currentStep === 2 && (
      <ContainerWithDispersedContent margin="4rem 0">
        <ColumnWithLeftSideContent>
          <LgTitle>Ticker Name</LgTitle>
          <InputWithEye
            action={() => {}}
            placeholder="e.g. RIN"
            type="text"
            value=""
            onChange={() => {

            }}
          />
        </ColumnWithLeftSideContent>
        <ColumnWithLeftSideContent>
          <LgTitle>Token Full name</LgTitle>
          <Input
            type="text"
            placeholder="e.g. Aldrin"
            value=""
            onChange={() => {

            }}
          />
        </ColumnWithLeftSideContent>
        <ColumnWithLeftSideContent>
          <LgTitle>Token Mint</LgTitle>
          <Input
            type="text"
            placeholder="e.g. E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp"
            value=""
            onChange={() => {

            }}
          />
        </ColumnWithLeftSideContent>
      </ContainerWithDispersedContent>
      )}
      <Navbar
        submit={() => {}}
        disabled={false}
      />
    </>
  )
}
