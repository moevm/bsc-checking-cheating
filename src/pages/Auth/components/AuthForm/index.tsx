import React, { FC, useState, ChangeEventHandler, FormEventHandler } from 'react'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import CustomPaper from 'components/CustomPaper'
import S from './styles'

type TOuterProps = {}
type TProps = TOuterProps
type TState = {
  email?: string
  password?: string
}

const AuthForm: FC<TProps> = () => {
  const [form, setForm] = useState<TState>({})
  const { user } = useStore()

  const onChange = (property: keyof TState): ChangeEventHandler<HTMLInputElement> => e => {
    setForm({ ...form, [property]: e.target.value })
  }

  const onFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    user.requestAuth(form)
  }

  return (
    <CustomPaper>
      <S.Form onSubmit={onFormSubmit}>
        <S.LoginTextField
          id="name"
          label="Email"
          size="small"
          variant="outlined"
          value={form.email}
          onChange={onChange('email')}
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
        <S.Button type="submit" color="primary" variant="contained">
          Авторизоваться
        </S.Button>
      </S.Form>
    </CustomPaper>
  )
}

export default observer(AuthForm)
