import React, { FC } from 'react'

import S from './styles'

type TOuterProps = {
  title: string
}
type TProps = TOuterProps

const PageSection: FC<TProps> = ({ children, title }) => (
  <S.Section>
    <S.Title>{title}</S.Title>
    {children}
  </S.Section>
)

export default PageSection
