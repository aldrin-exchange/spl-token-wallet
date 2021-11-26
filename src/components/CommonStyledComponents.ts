import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { EXTENSION_WIDTH } from './config'
import Background from '../images/background.png'
import {
  BORDER_RADIUS, COLORS, FONTS, FONT_SIZES,
} from './variables'

interface WithMargin {
  margin?: string;
}

interface NeedHeader {
  needHeader?: boolean;
}

interface StyledButton {
  background?: string;
  needOpacity?: boolean;
}

interface StyledTextContainer {
  needBorder?: boolean;
  needOpacity?: boolean;
}

export const Wrapper = styled.div`
  width: 369px;
  height: 600px;
  max-width: ${EXTENSION_WIDTH}px;
  background-image: url(${Background});
  background-color: ${COLORS.bodyBackground};
  background-size: cover;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
export const InnerWrapper = styled(Container)<NeedHeader>`
  height: ${(props) => (!props.needHeader ? '100%' : 'calc(100% - 17rem)')};
  flex-direction: column;
`

export const XxlHeader = styled.p`
  color: ${COLORS.main};
  font-family: ${FONTS.bd};
  font-size: ${FONT_SIZES.xxl};
  text-align: center;
`

export const LgTitle = styled(XxlHeader)<WithMargin>`
  font-size: ${FONT_SIZES.lg};
  margin: ${(props) => props.margin || '0'};
`

export const MdDescription = styled(XxlHeader)`
  font-size: ${FONT_SIZES.md};
`

export const ContainerWithCenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: calc(100% - 4rem);
  padding: 2rem;
`
export const ContainerWithDispersedContent = styled(
  ContainerWithCenteredContent,
)`
  justify-content: space-around;
`

export const RowWithStrechedContent = styled.div<WithMargin>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: ${(props) => props.margin || '0'};
`

export const RowWithCenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`

export const YellowHintBlock = styled.div`
  display: inline;
  background: rgba(189, 136, 0, 0.5);
  backdrop-filter: blur(16px);
  padding: 2rem;
  border-radius: ${BORDER_RADIUS.lg};
  color: ${COLORS.main};
  font-family: ${FONTS.rg};
  font-size: ${FONT_SIZES.lg};
  text-align: center;
  line-height: 2.5rem;
`

export const Button = styled.button<StyledButton>`
  width: 100%;
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
`

export const TextContainer = styled.div<StyledTextContainer>`
  padding: ${(props) => (props.needBorder ? '2rem 1rem' : '0 1rem')};
  height: 17rem;
  width: calc(100% - 2rem);
  background: ${(props) => (props.needBorder ? 'rgba(34, 36, 41, 0.7)' : 'none')};
  border: ${(props) => (props.needBorder ? `0.1rem solid ${COLORS.border}` : 'none')};
  border-radius: ${BORDER_RADIUS.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  opacity: ${(props) => (props.needOpacity ? '0.5' : '1')};
`

export const SmallRoundButton = styled.button<StyledButton>`
  width: 6rem;
  height: 3.5rem;
  color: ${COLORS.main};
  font-size: ${FONT_SIZES.rg};
  border-radius: ${BORDER_RADIUS.rg};
  background: rgba(34, 36, 41, 0.7);
  border: 0.2rem solid ${COLORS.border};
  cursor: pointer;
`
