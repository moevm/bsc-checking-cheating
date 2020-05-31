import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const CustomButton = styled(Button)`
  font-weight: 600;
  color: ${props => props.theme.colors.TINT[700]};
  &:hover {
    background-color: ${props => props.theme.colors.TINT[300]};
  }
`

const Styled = {
  LoadedFileWrapper: styled.div`
    width: 22rem;
  `,
  LoadedFile: styled.p`
    margin: ${props => props.theme.sizes.MARGIN} 0;
    font-weight: 600;
  `,
  ButtonsWrapper: styled.div``,
  SendButton: styled(CustomButton)`
    background-color: ${props => props.theme.colors.SUCCESS};
  `,
  CandelButton: styled(CustomButton)`
    margin-left: 0.625rem;
    background-color: ${props => props.theme.colors.DANGER};
  `
}

export default Styled
