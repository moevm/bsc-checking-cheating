import { Link } from 'react-router5'
import styled from 'styled-components'

const Styled = {
  Link: styled(Link)`
    display: flex;
    color: ${props => props.theme.colors.TEXT};
    text-decoration: none;
  `
}

export default Styled
