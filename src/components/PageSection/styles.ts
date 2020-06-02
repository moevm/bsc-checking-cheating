import styled from 'styled-components'

const Styled = {
  Section: styled.section`
    height: 100%;
    padding: ${props => props.theme.sizes.MAIN_PADDING};
    overflow: auto;
  `,
  Title: styled.h1`
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    font-weight: 300;
    color: ${props => props.theme.colors.TITLE};
  `
}

export default Styled
