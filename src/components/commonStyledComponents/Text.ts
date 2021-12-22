
import styled from 'styled-components'
import {
  COLORS, FONTS, FONT_SIZES, BORDER_RADIUS,
} from '../variables'

interface Text {
  margin?: string;
  fontSize?: string
}

interface HintConatiner {
  fontSize?: string
  font?: string
  red?:boolean
}

export const XxlHeader = styled.p<Text>`
color: ${(props) => props.color || COLORS.main};
font-family: ${FONTS.bd};
font-size: ${FONT_SIZES.xxl};
text-align: center;
margin: ${(props) => props.margin || 'auto 0'};
`

export const LgTitle = styled(XxlHeader)<Text>`
font-size: ${FONT_SIZES.lg};
margin: ${(props) => props.margin || '0'};
`

export const MdDescription = styled(XxlHeader)`
font-size: ${FONT_SIZES.md};
`
export const ThinMdDescription = styled(XxlHeader)`
font-size: ${FONT_SIZES.rg};
font-family: ${FONTS.lt};
`

export const ThinGreenText = styled(LgTitle)`
  color: ${COLORS.success}; 
  font-family: ${FONTS.lt};
  font-size: ${(props) => props.fontSize || FONT_SIZES.lg};
`

export const YellowHintBlock = styled.div<HintConatiner>`
  display: inline;
  background: rgba(189, 136, 0, 0.5);
  backdrop-filter: blur(16px);
  padding: 2rem;
  border-radius: ${BORDER_RADIUS.lg};
  color: ${COLORS.main};
  font-family: ${(props) => props.font || FONTS.rg};
  font-size: ${(props) => props.fontSize || FONT_SIZES.lg};
  text-align: center;
  line-height: 2.5rem;
  width: calc(100% - 4rem);
`
export const ErrorHintBlock = styled.div<HintConatiner>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: ${(props) => (props.red ? 'rgba(224, 33, 24, 0.5)' : 'rgba(189, 136, 0, 0.5)')};
  backdrop-filter: blur(16px);
  padding: 2rem;
  border-radius: ${BORDER_RADIUS.md};
  color: ${COLORS.main};
  font-family: ${(props) => props.font || FONTS.rg};
  font-size: ${(props) => props.fontSize || FONT_SIZES.lg};
  text-align: center;
  line-height: 2.5rem;
  width: calc(100% - 4rem);
  margin: 1rem 0 0 0;
`
