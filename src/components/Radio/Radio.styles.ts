import styled from 'styled-components'
import { COLORS } from '../variables'

const Container = styled.div`
    display: flex;
`

const AttributeContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 13px;
`

const Label = styled.label`
    position: relative;
    padding-left: 16px;
    cursor: pointer;
    font-size: 11px;
    color: #818181;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover {
        color: #4eb3ff;
    }
`

const Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    border: 1px solid #818181;
    border-radius: 50%;
    &::after {
        content: "";
        position: absolute;
        display: none;
        top: 2px;
        left: 2px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background-color: ${COLORS.success};
    }
`

const Input = styled.input`
    display: none;
    &:checked ~ ${Checkmark} {
        border: 1px solid ${COLORS.success};
        transition: all .25s ease-in-out;
    }
    &:checked ~ ${Checkmark}:after {
        display: block;
    }
`

export {
  Label, Input, Checkmark, Container, AttributeContainer,
}
