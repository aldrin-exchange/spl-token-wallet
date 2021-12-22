import React from 'react'
import {
  Input, Label, Checkmark, Container, AttributeContainer,
} from './Radio.styles'


export const Radio = ({ label = '', checked }:{ label?: string, checked:boolean }) => (
  <div>
    <Container>
      <AttributeContainer>
        <Label htmlFor="inside">
          {label}
          <Input type="radio" name="radio" id="inside" value="inside" checked={checked} />
          <Checkmark />
        </Label>
      </AttributeContainer>
    </Container>
  </div>
)

Radio.propTypes = {
  label: '',
}

Radio.defaultProps = {
  label: '',
}
