import styled from 'styled-components'
import { ColumnWithCenteredContent, RowWithStrechedContent } from '../commonStyledComponents/Containers'
import { COLORS } from '../variables'

export const NavbarContainer = styled(RowWithStrechedContent)`
  background: rgba(34, 36, 41, 0.7);
  border-top: 0.1rem solid ${COLORS.background};
  height: 4rem;
  padding: 2rem;
  width: calc(100% - 4rem);
`
export const IconsContainer = styled(ColumnWithCenteredContent)`
  width: 4rem;
  height: 6rem
`
