import styled from 'styled-components'

const HEADER_HEIGHT = '3.75rem'

const Styled = {
  Section: styled.section`
    height: 100%;
    overflow: hidden;
  `,
  TitleWrapper: styled.div`
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT};
    padding: 0 ${props => props.theme.sizes.MAIN_PADDING};
    background-color: ${props => props.theme.colors.TINT[700]};
    box-shadow: 0 0 5px ${props => props.theme.colors.TINT[20]};
  `,
  Title: styled.h1`
    margin-right: auto;
    font-size: 1rem;
    font-weight: 300;
    color: ${props => props.theme.colors.TITLE};
  `,
  ContentWrapper: styled.div`
    height: calc(100% - ${HEADER_HEIGHT});
    padding: 1.25rem ${props => props.theme.sizes.MAIN_PADDING};
    overflow: auto;
  `
}

export default Styled
