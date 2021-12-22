import styled from 'styled-components'
import { RowWithStrechedContent } from '../commonStyledComponents/Containers'
import { BORDER_RADIUS, COLORS, FONT_SIZES } from '../variables'

export const HeaderContainer = styled(RowWithStrechedContent)`
  background: rgba(34, 36, 41, 0.5);
  border-bottom: 0.1rem solid ${COLORS.background};
  height: 13rem;
  width: calc(100% - 4rem);
  padding: 2rem;
`
export const BackButton = styled.button`
  width: auto;
  padding: 1rem 1.5rem;
  color: ${COLORS.main};
  font-size: ${FONT_SIZES.lg};
  background: ${COLORS.background};
  border-radius: ${BORDER_RADIUS.xl};
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }
  img {
    margin: 0 3px 1px 0;
  }
`
