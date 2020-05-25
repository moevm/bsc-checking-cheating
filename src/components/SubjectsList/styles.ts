import ListItem from '@material-ui/core/ListItem'
import styled from 'styled-components'

const Styled = {
  NestedItem: styled(ListItem)`
    padding-left: ${props => props.theme.sizes.NESTED_LIST_PADDING};
  `
}

export default Styled
