/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import EyeIcon from '../../images/basic/eye.svg'
import Search from '../../images/basic/search.svg'
import { LgTitle } from '../commonStyledComponents/Text'
import { COLORS } from '../variables'
import { Input, InputContainer, InputOptionStyles } from './Input.styles'


export const InputWithEye = ({
  action, type, value, onChange, placeholder = 'Enter your password', onKeyDown,
}:{
  action:any, type:string, value:string, onChange:(e:any)=>void, placeholder?:string, onKeyDown?: (e: any) => void
}) => (
  <InputContainer>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
    <img
      src={EyeIcon}
      alt="hide"
      style={InputOptionStyles}
      onClick={action}
    />
  </InputContainer>
)

export const InputWithTitle = ({ placeholder }:{ placeholder:string }) => (
  <InputContainer>
    <Input placeholder={placeholder} />
    <LgTitle
      color={COLORS.hint}
      style={InputOptionStyles}
    >
      Minutes Idle
    </LgTitle>
  </InputContainer>
)

export const InputWithSearch = ({
  action, type, value, onChange, width = '80%',
}:{
  action:any, type:string, value:string, onChange:(e:any)=>void, width?:string
}) => (
  <InputContainer>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder="Search..."
      style={{ width, marginTop: '0' }}
    />
    <img
      src={Search}
      alt="Search"
      style={{ position: 'absolute', right: '3rem', top: '40%' }}
      width="10px"
      onClick={action}
    />
  </InputContainer>
)
