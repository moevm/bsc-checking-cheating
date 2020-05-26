import Button from '@material-ui/core/Button'
import Close from '@material-ui/icons/Close'
import styled from 'styled-components'

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.TRANSLUCENT_BLACK};
    z-index: 1;
  `,
  Container: styled.div`
    position: absolute;
    padding: 1.25rem 1.5625rem;
    background-color: ${({ theme }) => theme.colors.WHITE};
    border-radius: 0.3125rem;
  `,
  Button: styled(Button)`
    position: absolute;
    top: 3.125rem;
    right: 3.125rem;
    min-width: auto;
    padding: 0.3125rem;
    transition: background-color 0.1s;
    &:hover {
      background-color: ${props => props.theme.colors.DANGER};
      & ${() => Styled.Close} {
        color: ${props => props.theme.colors.TINT[700]};
      }
    }
  `,
  Close: styled(Close)`
    transition: color 0.1s;
  `
}

export default Styled
