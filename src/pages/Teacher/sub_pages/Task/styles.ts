import { Link } from 'react-router5'
import styled from 'styled-components'

import Form from './components/Form'

const Styled = {
  Link: styled(Link)`
    display: inline-block;
    margin-bottom: 0.625rem;
    color: ${props => props.theme.colors.TINT[300]};
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.TEXT};
    }
  `,
  TaskForm: styled(Form)`
    margin-bottom: 1.25rem;
  `
}

export default Styled
