import ListItemText from '@material-ui/core/ListItemText'
import TableCell from '@material-ui/core/TableCell'
import styled from 'styled-components'

import Button from 'components/Button'

const Styled = {
  ListItemText: styled(ListItemText)`
    font-weight: 700;
  `,
  TableCell: styled(TableCell)`
    font-weight: 700;
  `,
  Button: styled(Button)`
    margin-top: 0.9375rem;
  `
}

export default Styled
