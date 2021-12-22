import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  FONTS, COLORS, BORDER_RADIUS, FONT_SIZES,
} from '../variables'

interface StyledButton {
  background?: string;
  needOpacity?: boolean;
  fontSize?: string;
  width?: string;
}

interface WithMargin {
  margin?: string;
}

export const Button = styled.button<StyledButton>`
width: ${(props) => props.width || '100%'};
background: ${(props) => props.background || COLORS.primary};
font-family: ${FONTS.md};
padding-top: 1.3rem;
padding-bottom: 1.3rem;
color: ${COLORS.main};
font-size: ${FONT_SIZES.rg};
outline: none;
border: none;
border-radius: ${BORDER_RADIUS.md};
cursor: pointer;
transition: 0.2s;
&:disabled {
  background: ${COLORS.hint}
}
&:hover {
    opacity: 0.8;
    transition: 0.2s;
}
`

export const SmallRoundButton = styled.button<StyledButton>`
    width: 6rem;
    height: 3.5rem;
    color: ${COLORS.main};
    font-size: ${(props) => props.fontSize || FONT_SIZES.rg};
    border-radius: ${BORDER_RADIUS.rg};
    background: ${(props) => props.background || 'rgba(34, 36, 41, 0.7)'};
    border: 0.2rem solid ${COLORS.border};
    cursor: pointer;
    margin: 0.4rem 0.3rem;
    opacity: ${(props) => (props.needOpacity ? '0.5' : '1')};
    transition: 0.2s;
        &:hover {
            opacity: 0.8;
            transition: 0.2s;
        }
`

export const VioletBox = styled(Link)<WithMargin>`
  width: 39%;
  height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem 1rem;
  background-color: ${COLORS.primary};
  border-radius: ${BORDER_RADIUS.lg};
  margin: ${(props) => props.margin || '0'};
  transition: 0.2s;
    &:hover {
        opacity: 0.8;
        transition: 0.2s;
    }
`
export const StyledLink = styled(Link)<StyledButton>`
width: ${(props) => props.width || '100%'};
background: ${(props) => props.background || COLORS.primary};
font-family: ${FONTS.md};
padding-top: 1.3rem;
padding-bottom: 1.3rem;
color: ${COLORS.main};
font-size: ${FONT_SIZES.rg};
outline: none;
border: none;
border-radius: ${BORDER_RADIUS.md};
cursor: pointer;
transition: 0.2s;
text-align: center;
&:disabled {
  background: ${COLORS.hint}
}
&:hover {
    opacity: 0.8;
    transition: 0.2s;
}
`
export const SmallVioletButton = styled(SmallRoundButton)`
    border:none;
    background: ${COLORS.primary};
    width: 9rem;
    border-radius: ${BORDER_RADIUS.lg};
`
export const SquareButton = styled(Button)<StyledButton>`
  width: 6rem;
  height: 6rem;
  margin: 0.5rem;
  border-radius: ${BORDER_RADIUS.rg};
`
