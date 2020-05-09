import React, { FC } from 'react'
import styled from 'styled-components'

// import styles from './styles'

type Props = {}

const Main = styled.main`
  background-color: blue;
`

const Layout: FC<Props> = ({ children }) => {
  return <Main>{children}</Main>
}

export default Layout
