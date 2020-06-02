import React, { FC } from 'react'

import S from './styles'

type TOuterProps = {
  className?: string
  title: string
}
type TProps = TOuterProps

const PageSection: FC<TProps> = ({ className, children, title }) => (
  <S.Section className={className}>
    <S.Title>{title}</S.Title>
    {children}
  </S.Section>
)

export default PageSection
