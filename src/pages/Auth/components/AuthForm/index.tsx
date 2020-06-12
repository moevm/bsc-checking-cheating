import React, { FC, useState, ChangeEventHandler } from 'react'
import { observer } from 'mobx-react'

import CustomPaper from 'components/CustomPaper'

import S from './styles'

type TOuterProps = {}
type TProps = TOuterProps
type TState = {
  login?: string
  password?: string
}

const AuthForm: FC<TProps> = () => {
  const [form, setForm] = useState<TState>({})

  const onChange = (property: keyof TState): ChangeEventHandler<HTMLInputElement> => e => {
    setForm({ ...form, [property]: e.target.value })
  }

  return (
    <CustomPaper>
      <S.Form>
        <S.LoginTextField
          id="name"
          label="Логин"
          size="small"
          variant="outlined"
          value={form.login}
          onChange={onChange('login')}
        />
        <S.PasswordTextField
          id="bound"
          type="password"
          label="Пароль"
          size="small"
          variant="outlined"
          value={form.password}
          onChange={onChange('password')}
        />
        <S.Button color="primary" variant="contained">
          Авторизоваться
        </S.Button>
      </S.Form>
    </CustomPaper>
  )
}

export default observer(AuthForm)
