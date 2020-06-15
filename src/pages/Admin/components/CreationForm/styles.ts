import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const Styled = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
  `,
  TextField: styled(TextField)`
    margin-bottom: 1rem;
  `
}

export default Styled
