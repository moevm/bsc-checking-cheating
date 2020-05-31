import Button from '@material-ui/core/Button'
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
    &:hover {
      & ${() => Styled.InfoButton} {
        opacity: 1;
      }
    }
  `,
  InfoButton: styled(Button)`
    opacity: 0;
    transition: opacity 0.2s;
  `
}

export default Styled
