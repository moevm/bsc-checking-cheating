import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const Styled = {
  Button: styled(Button)`
    font-weight: 700;
    color: ${props => props.theme.colors.TINT[700]};
    pointer-events: none;
  `
}

export default Styled
