import styled from 'styled-components'

import StyledList from 'components/SubjectsList'

export default {
  Section: styled.section`
    padding: ${props => props.theme.sizes.MAIN_PADDING};
  `,
  SubjectsList: styled(StyledList)`
    margin-top: 0.625rem;
  `
}
