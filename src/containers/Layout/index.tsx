import React, { FC } from 'react'
import { Link } from 'react-router5'

import { routes } from 'constants/routes'

import { GlobalStyle, Navigation, Main } from './styles'

type TOuterProps = {}
type TProps = TOuterProps

const Layout: FC<TProps> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Navigation>
        {routes.map((item, index) => (
          <Link key={index} routeName={item.name}>
            {item.name}
          </Link>
        ))}
      </Navigation>
      <Main>{children}</Main>
    </>
  )
}

export default Layout
