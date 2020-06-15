import React, { FC } from 'react'

import useStore from 'hooks/useStore'
import Button from 'components/Button'

import S from './styles'

type TOuterProps = {
  className?: string
  title: string
}
type TProps = TOuterProps

const PageSection: FC<TProps> = ({ className, children, title }) => {
  const { user } = useStore()

  return (
    <S.Section className={className}>
      <S.Title>{title}</S.Title>
      {user.isAuthorized && <Button onClick={user.logOut}>Выйти</Button>}
      {children}
    </S.Section>
  )
}
export default PageSection
