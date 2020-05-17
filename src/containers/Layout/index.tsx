import React, { FC } from 'react'
import { Link } from 'react-router5'

import { routes } from 'constants/routes'

import styled, { createGlobalStyle } from 'styled-components'

// import { GlobalStyle, Main } from './styles'

type TOuterProps = {}
type TProps = TOuterProps

// export const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//   }

//   html, body, #root {
//     width: 100%;
//     height: 100%;
//   }
// `

export const Main = styled.main`
  width: 100%;
  height: 100%;
`

const Layout: FC<TProps> = ({ children }) => {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Main>
        <div>
  
          {routes.map((item, index) => (
            <Link key={index} routeName={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
        {children}
      </Main>
    </>
  )
}

export default Layout
