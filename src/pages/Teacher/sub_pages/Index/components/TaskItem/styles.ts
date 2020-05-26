import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router5'
import styled from 'styled-components'

const Styled = {
  Link: styled(Link)`
    display: flex;
    color: ${props => props.theme.colors.TEXT};
    text-decoration: none;
  `,
  Item: styled(ListItem)`
    padding-left: ${props => props.theme.sizes.NESTED_LIST_PADDING};
  `
}

export default Styled
