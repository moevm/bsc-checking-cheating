import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import styled from 'styled-components'

import CustomPaper from 'components/CustomPaper'

const Styled = {
  CustomPaper: styled(CustomPaper)`
    margin-bottom: ${props => props.theme.sizes.MARGIN};
  `,
  Item: styled(ListItem)`
    padding-left: ${props => props.theme.sizes.NESTED_LIST_PADDING};
  `,
  SubjectName: styled(ListItemText)`
    margin-left: 1.5625rem;
  `,
  Groups: styled(ListItemText)`
    font-weight: 700;
    text-align: right;
  `,
  BoldText: styled.span``,
  Button: styled(Button)`
    margin-left: auto;
  `
}

export default Styled
