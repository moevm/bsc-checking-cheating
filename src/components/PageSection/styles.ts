import styled from 'styled-components'

const Styled = {
  Section: styled.section`
    flex: 1;
    padding: ${props => props.theme.sizes.MAIN_PADDING};
    overflow: auto;
  `,
  Title: styled.h1`
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 300;
    color: ${props => props.theme.colors.TEXT};
  `
}

export default Styled
