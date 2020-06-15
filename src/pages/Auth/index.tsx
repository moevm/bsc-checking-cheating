import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import AuthForm from './components/AuthForm'

import S from './styles'

type TOuterProps = {}
type TProps = TOuterProps

const AuthPage: FC<TProps> = () => {
  return (
    <S.Section title="Авторизация">
      {/* <S.Link routeName="student">Студент</S.Link>
      <S.Link routeName="teacher">Преподаватель</S.Link> */}
      <AuthForm />
    </S.Section>
  )
}

export default compose(hot, observer)(AuthPage)
