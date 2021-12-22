/* eslint-disable no-console */
import React, { useState } from 'react'
import { ColumnWithLeftSideContent, ContainerWithDispersedContent } from '../../../components/commonStyledComponents/Containers'
import { LgTitle, YellowHintBlock } from '../../../components/commonStyledComponents/Text'
import { InputWithEye, InputWithTitle } from '../../../components/Inputs/Input'
import { FONTS, FONT_SIZES } from '../../../components/variables'


const CreatePassword = ({ password, setPassword }:{ password:string, setPassword:(e)=>void }) => {
  const [showPassword, setShowPassword] = useState(false)
  console.log('pass', password)
  return (
    <ContainerWithDispersedContent padding="7rem 2rem">
      <YellowHintBlock
        fontSize={FONT_SIZES.rg}
        font={FONTS.bd}
      >
        This password will unlock your wallet only on this device.
      </YellowHintBlock>
      <ColumnWithLeftSideContent>
        <LgTitle>Create password</LgTitle>
        <InputWithEye
          action={() => setShowPassword(!showPassword)}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </ColumnWithLeftSideContent>
      <ColumnWithLeftSideContent>
        <LgTitle>Lock wallet after</LgTitle>
        <InputWithTitle placeholder="60" />
      </ColumnWithLeftSideContent>
    </ContainerWithDispersedContent>
  )
}

export { CreatePassword }
