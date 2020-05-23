import styled from 'styled-components'

import { TOuterProps } from './index'

const SMALL_SIZE = '0.3125rem 0.625rem'
const REGULAR_SIZE = '0.625rem 0.9375rem'

const Styled = {
  Button: styled.button<TOuterProps>`
    ${props => `
      padding: ${props.size === 'small' ? SMALL_SIZE : REGULAR_SIZE};
      color: ${props.theme.colors.TINT[600]};
      background-color: ${props.theme.colors[props.color.toUpperCase()]};
    `}
    font: inherit;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    outline: none;
    &:hover {
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
    }
  `
}

export default Styled
