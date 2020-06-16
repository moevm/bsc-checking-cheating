import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

type TComponentProps = {
  component: string
}

const Styled = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
  `,
  TextField: styled(TextField)`
    margin-bottom: 1rem;
  `,
  FormControl: styled(FormControl)<TComponentProps>`
    margin-bottom: 1rem;
  `,
  Select: styled(Select)`
    margin-bottom: 1rem;
  `
}

export default Styled
