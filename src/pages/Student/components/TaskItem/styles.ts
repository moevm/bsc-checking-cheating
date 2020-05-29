import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import styled from 'styled-components'

import Result from 'components/Result'

const Styled = {
  ListItem: styled(ListItem)`
    padding-left: ${props => props.theme.sizes.NESTED_LIST_PADDING};
    &:hover {
      & ${() => Styled.Button} {
        opacity: 1;
      }
    }
  `,
  Button: styled(Button)`
    opacity: 0;
    transition: opacity 0.3s;
  `,
  Result: styled(Result)`
    margin-left: ${props => props.theme.sizes.MARGIN};
  `
}

export default Styled
