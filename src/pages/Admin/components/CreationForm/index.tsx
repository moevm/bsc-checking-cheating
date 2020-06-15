import React, { FC, FormEventHandler, useMemo, useState } from 'react'

import Button from 'components/Button'

import S from './styles'

export type TModalForm = {
  properties: string[]
  onSubmitClick: (info: any) => void
}
type TOuterProps = TModalForm & {
  className?: string
  onClose: () => void
}
type TProps = TOuterProps

const CreationForm: FC<TProps> = ({ className, properties, onClose, onSubmitClick }) => {
  const obj = useMemo(
    () =>
      properties.reduce((result, property) => {
        result[property] = ''
        return result
      }, {}),
    [properties]
  )
  const [form, setForm] = useState<typeof obj>(obj)

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    onClose()
    onSubmitClick(form)
  }

  return (
    <S.Form onSubmit={onSubmit} noValidate autoComplete="off">
      {properties.map((property, index) => (
        <S.TextField
          key={index}
          id={property}
          label={property}
          size="small"
          variant="outlined"
          value={form[property]}
          onChange={e => setForm({ ...form, [property]: e.target.value })}
        />
      ))}
      <Button type="submit" nColor="success">
        Отправить
      </Button>
    </S.Form>
  )
}

export default CreationForm
