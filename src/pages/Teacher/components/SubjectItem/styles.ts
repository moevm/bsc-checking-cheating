import styled from 'styled-components'

import Button from 'components/Button'

const Styled = {
  Button: styled(Button)`
    margin-left: ${props => props.theme.sizes.MARGIN};
  `
}

export default Styled
