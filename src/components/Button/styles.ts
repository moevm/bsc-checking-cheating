import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import { TOuterProps } from './index'

const SMALL_SIZE = '0.3125rem 0.625rem'
const REGULAR_SIZE = '0.625rem 0.9375rem'

const Styled = {
  Button: styled(Button)<TOuterProps>`
    font-weight: 700;
    background-color: ${props => props.theme.colors[props.nColor.toUpperCase()]};
    &:hover {
      background-color: ${props => props.theme.colors.TINT[300]};
    }
  `
}

// ${props => `
//       padding: ${props.size === 'small' ? SMALL_SIZE : REGULAR_SIZE};
//       color: ${props.theme.colors.TINT[600]};
//
//     `}
//     font: inherit;
//     font-size: 0.75rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     border: 1px solid transparent;
//     border-radius: 0.25rem;
//     outline: none;
//     transition: box-shadow 0.3s;
//     &:hover {
//       box-shadow: inset 0 0 20px ${props => props.theme.colors.TINT[20]};
//     }

export default Styled
