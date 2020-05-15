import React, { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router5'

import { routes } from 'constants/routes'
// import styles from './styles'

type Props = {}

const Main = styled.main`
  background-color: blue;
`

const Layout: FC<Props> = ({ children }) => {
  return (
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
  )
}

export default Layout
