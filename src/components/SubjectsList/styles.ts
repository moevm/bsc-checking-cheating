import ListItem from '@material-ui/core/ListItem'
import styled from 'styled-components'

import CustomPaper from 'components/CustomPaper'

const Styled = {
  CustomPaper: styled(CustomPaper)`
    margin-bottom: ${props => props.theme.sizes.MARGIN};
  `,
  Item: styled(ListItem)`
    padding-left: ${props => props.theme.sizes.NESTED_LIST_PADDING};
  `
}

export default Styled
