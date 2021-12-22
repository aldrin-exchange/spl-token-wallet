import React from 'react'
import styled from 'styled-components'
import {
  BORDER_RADIUS, COLORS, FONTS, FONT_SIZES,
} from '../variables'

interface StyledSwitcher {
  isActive?:boolean
}

export const Container = styled.div`
    width: 100%;
    background: ${COLORS.blockBackground};
    font-family: ${FONTS.md};
    color: ${COLORS.main};
    font-size: ${FONT_SIZES.rg};
    outline: none;
    border: none;
    border-radius: ${BORDER_RADIUS.md};
    cursor: pointer;
`
export const Button = styled.button<StyledSwitcher>`
    width: 33%;
    background: ${(props) => (props.isActive ? COLORS.background : COLORS.blockBackground)};
    font-family: ${FONTS.md};
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    color: ${COLORS.main};
    font-size: ${FONT_SIZES.rg};
    outline: none;
    border: none;
    border-radius: ${BORDER_RADIUS.md};
    cursor: pointer;
`

export const Switcher = () => (
  <Container>
    <Button isActive>Assets</Button>
    <Button isActive={false}>NFT</Button>
    <Button isActive={false}>Activity</Button>
  </Container>
)
