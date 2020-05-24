import styled from 'styled-components'

const Styled = {
  Section: styled.section`
    flex: 1;
    padding: ${props => props.theme.sizes.MAIN_PADDING};
    overflow: auto;
  `,
  Title: styled.h1`
    margin-bottom: 1.5rem;
    padding-left: 0.8125rem;
    font-size: 2.5rem;
    font-weight: 300;
    color: ${props => props.theme.colors.TITLE};
  `
}

export default Styled
