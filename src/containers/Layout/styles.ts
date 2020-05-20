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
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`

export const Main = styled.main`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.MAIN};
`
