import styled from 'styled-components'
import { Link } from 'react-router5'

import PageSection from 'components/PageSection'

const Styled = {
  Section: styled(PageSection)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Link: styled(Link)`
    display: block;
    margin-bottom: 1.25rem;
    text-transform: uppercase;
  `
}

export default Styled
