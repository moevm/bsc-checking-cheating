import React, { ChangeEventHandler, FC, FormEventHandler, useMemo, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import Button from 'components/Button'

import S from './styles'

export type TRadio = {
  property: string
  title: string
  values: {
    id: string
    name: string
  }[]
}
export type TModalForm = {
  properties: string[]
  radio?: TRadio
  onSubmitClick: (info: any) => void
}
type TOuterProps = TModalForm & {
  className?: string
  onClose: () => void
}
type TProps = TOuterProps

const CreationForm: FC<TProps> = ({ className, properties, radio, onClose, onSubmitClick }) => {
  const obj = useMemo(() => {
    const obj = properties.reduce((result, property) => {
      result[property] = ''
      return result
    }, {})

    if (radio) {
      obj[radio.property] = radio.values[0].id
    }

    return obj
  }, [properties])
  const [form, setForm] = useState<{ [key: string]: any }>(obj)

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    onClose()
    onSubmitClick(form)
  }

  const onChange = (property: string): ChangeEventHandler<HTMLInputElement> => e => {
    setForm({ ...form, [property]: e.target.value })
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
          onChange={onChange(property)}
        />
      ))}
      {!!radio && (
        <FormControl component="fieldset">
          <FormLabel component="legend">{radio.title}</FormLabel>
          <RadioGroup
            name={radio.property}
            value={form[radio.property]}
            onChange={onChange(radio.property)}
          >
            {radio.values.map((item, index) => (
              <FormControlLabel key={index} value={item.id} control={<Radio />} label={item.name} />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      <Button type="submit" nColor="success">
        Отправить
      </Button>
    </S.Form>
  )
}

export default CreationForm
