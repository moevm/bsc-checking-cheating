import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import styled from 'styled-components'

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
  Result: styled(Button)`
    margin-left: ${props => props.theme.sizes.MARGIN};
    font-weight: 700;
    color: ${props => props.theme.colors.TINT[700]};
    pointer-events: none;
  `
}

export default Styled
