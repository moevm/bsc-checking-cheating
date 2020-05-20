import styled from 'styled-components'

export default {
  Button: styled.button`
    height: ${props => props.theme.sizes.CONTROL_HEIGHT};
    padding: 0 0.9375rem;
    color: white;
    background-color: black;
    border: 1px solid ${props => (props.disabled ? 'transparent' : props.theme.colors.BORDER_COLOR)};
    border-radius: 0.3125rem;
    outline: none;
    &:hover {
      opacity: 0.7;
    }
  `
}
