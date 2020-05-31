import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

type TWithComponent = {
  component: string
}

const CustomButton = styled(Button)`
  font-weight: 700;
  color: ${props => props.theme.colors.TINT[700]};
  &:hover {
    background-color: ${props => props.theme.colors.TINT[300]};
  }
`

const Styled = {
  Wrapper: styled.div`
    display: flex;
  `,
  WrapperWithMargin: styled.div`
    display: flex;
    margin-top: ${props => props.theme.sizes.MARGIN};
  `,
  LeftColumn: styled.div`
    flex: 1;
    margin-right: ${props => props.theme.sizes.MARGIN};
  `,
  NameTextField: styled(TextField)`
    margin-bottom: ${props => props.theme.sizes.MARGIN};
  `,
  SecondRow: styled.div`
    display: flex;
    align-items: center;
  `,
  BoundTextField: styled(TextField)`
    margin: 0 ${props => props.theme.sizes.MARGIN};
  `,
  GroupFormControl: styled(FormControl)`
    min-width: 15.625rem;
  `,
  RightColumn: styled.div`
    display: flex;
    flex-direction: column;
  `,
  SaveButton: styled(CustomButton)`
    background-color: ${props => props.theme.colors.SUCCESS};
  `,
  CancelButton: styled(CustomButton)`
    margin: 0.625rem 0;
    background-color: ${props => props.theme.colors.PRIMARY};
  `,
  DeleteButton: styled(CustomButton)`
    background-color: ${props => props.theme.colors.DANGER};
  `,
  FormControl: styled(FormControl)<TWithComponent>`
    margin-right: calc(2 * ${props => props.theme.sizes.MARGIN});
  `,
  FormLabel: styled(FormLabel)<TWithComponent>`
    font-size: 0.75rem;
  `,
  FormControlLabel: styled(FormControlLabel)`
    white-space: nowrap;
  `,
  ListItem: styled(ListItem)`
    &:hover {
      & ${() => Styled.FakeButton} {
        opacity: 1;
      }
    }
  `,
  FakeButton: styled(Button)`
    opacity: 0;
    transition: opacity 0.2s;
  `
}

export default Styled
