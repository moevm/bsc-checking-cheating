import React, { FC } from 'react'

import { GlobalStyle, Main } from './styles'

type TOuterProps = {}
type TProps = TOuterProps

const Layout: FC<TProps> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Main>{children}</Main>
    </>
  )
}

export default Layout
