import styled from 'styled-components'
import {
  BORDER_RADIUS, COLORS, FONTS, FONT_SIZES,
} from '../variables'

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
`
export const InputOptionStyles: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  right: '2rem',
}

interface TextAreaContainer {
  margin?:string
}

export const Input = styled.input`
  height: 2rem;
  padding: 2rem;
  width: calc(100% - 4rem);
  border-radius: ${BORDER_RADIUS.md};
  margin-top: 2rem;
  background: rgba(34, 36, 41, 0.7);
  border: 0.1rem solid ${COLORS.border};
  color: ${COLORS.main};
  font-family: ${FONTS.md};
  font-size: ${FONT_SIZES.rg};
  outline: none;

  &:placeholder {
    color: ${COLORS.main};
    font-family: ${FONTS.md};
    font-size: ${FONT_SIZES.lg};
  }
`

export const TextArea = styled.textarea<TextAreaContainer>`
  height: 10rem;
  padding: 2rem;
  width: calc(100% - 4rem);
  border-radius: ${BORDER_RADIUS.md};
  margin: ${(props) => props.margin || '2rem 0 0 0'};
  background: rgba(34, 36, 41, 0.7);
  border: 0.1rem solid ${COLORS.border};
  color: ${COLORS.main};
  font-family: ${FONTS.md};
  font-size: ${FONT_SIZES.lg};
  outline: none;

  &:placeholder {
    color: ${COLORS.main};
    font-family: ${FONTS.md};
    font-size: ${FONT_SIZES.rg};
  }
`
