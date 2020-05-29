import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router5'
import styled from 'styled-components'

const Styled = {
  Link: styled(Link)`
    flex: 1;
    color: ${props => props.theme.colors.TEXT};
    text-decoration: none;
  `,
  FakeButton: styled(ListItem)`
    padding-left: ${props => props.theme.sizes.NESTED_LIST_PADDING};
  `
}

export default Styled
