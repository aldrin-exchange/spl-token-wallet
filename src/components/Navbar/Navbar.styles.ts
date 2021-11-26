import styled from 'styled-components'
import { RowWithStrechedContent } from '../CommonStyledComponents'
import { COLORS } from '../variables'

export const NavbarContainer = styled(RowWithStrechedContent)`
  background: rgba(34, 36, 41, 0.7);
  border-top: 0.1rem solid ${COLORS.background};
  height: 6rem;
  padding: 2rem;
  width: calc(100% - 4rem);
`
