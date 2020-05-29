import FormLabel from '@material-ui/core/FormLabel'
import styled from 'styled-components'
import { FormControlLabel, FormControl } from '@material-ui/core'

type TWithComponent = {
  component: string
}

const Styled = {
  Wrapper: styled.div`
    display: flex;
  `,
  WrapperWithMargin: styled.div`
    display: flex;
    margin-top: ${props => props.theme.sizes.MARGIN};
  `,
  FormControl: styled(FormControl)<TWithComponent>`
    margin-right: calc(2 * ${props => props.theme.sizes.MARGIN});
  `,
  FormLabel: styled(FormLabel)<TWithComponent>`
    font-size: 0.75rem;
  `,
  FormControlLabel: styled(FormControlLabel)`
    white-space: nowrap;
  `
}

export default Styled
