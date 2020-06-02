import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const Styled = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
  `,
  LoginTextField: styled(TextField)`
    width: 250px;
    margin-bottom: 1.2rem;
  `,
  PasswordTextField: styled(TextField)`
    margin-bottom: 3rem;
  `,
  Button: styled(Button)`
    font-weight: 700;
  `
}

export default Styled
