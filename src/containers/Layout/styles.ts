import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    font: 16px "Open Sans";
    overflow: hidden;
  }

  button:not(:disabled) {
    cursor: pointer;
    user-select: none;
  }
`

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`

export const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.MAIN};
  overflow: auto;
`
