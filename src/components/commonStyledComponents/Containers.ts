import styled from 'styled-components'
import { EXTENSION_WIDTH } from '../config'
import Background from '../../images/background.png'
import { COLORS, BORDER_RADIUS } from '../variables'

interface WrapperContainer {
  needOpacity?: boolean;
}

interface NeedHeader {
  needHeader?: boolean;
}

interface RowContainer {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}

interface WithMargin {
  margin?: string;
}

interface StyledTextContainer {
  needBorder?: boolean;
  needOpacity?: boolean;
  height?: string;
}

type RowProps = {
  wrap?: string;
  justify?: string;
  direction?: string;
  align?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  mediaDirection?: string;
  mediaJustify?: string;
  mediaMargin?: string;
  isOptionsOpen?: false;
}

// page wrappers

export const Wrapper = styled.div<WrapperContainer>`
  width: 369px;
  height: 600px;
  max-width: ${EXTENSION_WIDTH}px;
  background-image: url(${Background});
  background-color: ${COLORS.bodyBackground};
  background-size: cover;
  background: ${(props) => (props.needOpacity
    ? `linear-gradient(rgba(34, 36, 41, 0.5), rgba(34, 36, 41, 0.5)), url(${Background})`
    : `linear-gradient(rgba(34, 36, 41, 0), rgba(34, 36, 41, 0)), url(${Background})`)}
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
// containers

export const Row = styled.div`
  display: flex;
  flex-wrap: ${(props: RowProps) => props.wrap || 'nowrap'};
  justify-content: ${(props: RowProps) => props.justify || 'center'};
  flex-direction: ${(props: RowProps) => props.direction || 'row'};
  align-items: ${(props: RowProps) => props.align || 'center'};
  width: ${(props: RowProps) => props.width || 'auto'};
  height: ${(props: RowProps) => props.height || 'auto'};
  margin: ${(props: RowProps) => props.margin || '0'};
  padding: ${(props: RowProps) => props.padding || '0'};
`

export const ContainerWithCenteredContent = styled.div<RowContainer>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: calc(100% - 4rem);
  padding: ${(props) => props.padding || '2rem'};
  margin: ${(props) => props.margin || '0'}
`

export const ContainerWithDispersedContent = styled(
  ContainerWithCenteredContent,
)`
  justify-content: space-around;
  overflow: hidden;
`

export const RowWithStrechedContent = styled.div<WithMargin>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: ${(props) => props.margin || '0'};
`

export const ColumnWithCenteredContent = styled.div<RowContainer>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`

export const ColumnWithTopContent = styled(ColumnWithCenteredContent)`
  justify-content: flex-start;
  height: ${(props) => props.height || '47rem'};
  overflow: scroll;
  margin: ${(props) => props.margin || '0'};
`

export const ColumnWithLeftSideContent = styled(ColumnWithCenteredContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: ${(props) => props.margin || '0'};
`

export const TextContainer = styled.div<StyledTextContainer>`
  padding: ${(props) => (props.needBorder ? '2rem 1rem' : '0 1rem')};
  height: ${(props) => props.height || '17rem'};
  width: calc(100% - 2rem);
  background: ${(props) => (props.needBorder ? 'rgba(34, 36, 41, 0.7)' : 'none')};
  border: ${(props) => (props.needBorder ? `0.1rem solid ${COLORS.border}` : 'none')};
  border-radius: ${BORDER_RADIUS.md};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`

export const TransparentContainer = styled(TextContainer)`
  min-height: 4rem;
  width: calc(100% - 6rem);
  border: none;
  background: rgba(56, 59, 69, 0.5);
  margin: 0.6rem 0;
  padding: 2.5rem 3rem;
  flex-direction: ${(props:RowProps) => props.direction || 'column'};
  justify-content: ${(props:RowProps) => props.justify || 'flex-start'};
  align-items: ${(props:RowProps) => props.align || 'center'};
  transition: 0.5s;


  ${(props) => props.isOptionsOpen && `
  transform: translate(-55%, 0);
  animation-name: slideLeft;
  animation-duration: 0.5s; 
  animation-timing-function: ease-in-out; 
  visibility: visible !important; 

  @keyframes slideLeft {
    0% {
        transform: translateX(0%);
    }
    100%{
        transform: translateX(-55%);
    }
  }
  `
}
`
export const AnimatedButtonsContainer = styled(Row)`
  position:absolute;
  transform: translate(200%, 0);

  ${(props:RowProps) => props.isOptionsOpen && `
  transform: translate(103%, 0);
  animation-name: slideToTheLeft;
  animation-duration: 0.5s; 
  animation-timing-function: ease-in-out; 
  visibility: visible !important; 

  @keyframes slideToTheLeft {
    0% {
        transform: translateX(200%);
    }
    100%{
        transform: translateX(103%);
    }
  }

`
}

${(props:RowProps) => !props.isOptionsOpen && `
  animation-name: slideToTheRight;
  animation-duration: 0.4s; 
  animation-timing-function: ease-in-out; 
  visibility: visible !important; 

  @keyframes slideToTheRight {
    0% {
        transform: translateX(103%);
    }
    100%{
        transform: translateX(200%);
    }
  }

`
}
`
