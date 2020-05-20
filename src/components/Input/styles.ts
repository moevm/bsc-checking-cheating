import styled from 'styled-components'

export default {
  Input: styled.input`
    height: ${props => props.theme.sizes.CONTROL_HEIGHT};
    padding: 0 0.9375rem;
    text-overflow: ellipsis;
    background-color: ${props => props.theme.colors.MAIN};
    border: 1px solid ${props => (props.disabled ? 'transparent' : props.theme.colors.BORDER_COLOR)};
    border-radius: 0.3125rem;
  `
}
