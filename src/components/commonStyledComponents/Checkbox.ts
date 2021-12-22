import styled from 'styled-components'
import {
  COLORS,
} from '../variables'


export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  width: 1.5em;
  height: 1.5em;
  color: ${COLORS.success};
  border: 0.1rem solid ${COLORS.success};
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  background: ${COLORS.blockBackground}
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: 2px;
    left: 6px;
    width: 4px;
    height: 9px;
    border-style: solid;
    border-color: ${COLORS.success};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    background: ${COLORS.blockBackground};
    color: green;
    border-color: ${COLORS.success};
      &::before {
        opacity: 1;
    }
  }

`
