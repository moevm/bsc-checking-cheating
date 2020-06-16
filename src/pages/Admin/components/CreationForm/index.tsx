import React, { ChangeEventHandler, FC, FormEventHandler, useMemo, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Input from '@material-ui/core/Input'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import Button from 'components/Button'

import S from './styles'

export type TValue = {
  id: string
  name: string
}
export type TCheckbox = {
  property: string
  values: TValue[]
}
export type TRadio = {
  property: string
  title: string
  values: TValue[]
}
export type TModalForm = {
  checkbox?: TCheckbox
  meta?: any
  properties?: string[]
  radio?: TRadio
  onSubmitClick: (info: any) => void
}
type TOuterProps = TModalForm & {
  className?: string
  onClose: () => void
}
type TProps = TOuterProps

const CreationForm: FC<TProps> = ({
  className,
  checkbox,
  meta = {},
  properties,
  radio,
  onClose,
  onSubmitClick
}) => {
  const obj = useMemo(() => {
    const obj = properties
      ? properties.reduce((result, property) => {
          result[property] = ''
          return result
        }, {})
      : {}

    if (radio) {
      obj[radio.property] = radio.values[0].id
    }

    if (checkbox) {
      obj[checkbox.property] = []
    }

    return obj
  }, [properties])
  const [form, setForm] = useState<{ [key: string]: any }>(obj)

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    onClose()
    onSubmitClick({ ...form, ...meta })
  }

  const onChange = (property: string): ChangeEventHandler<HTMLInputElement> => e => {
    setForm({ ...form, [property]: e.target.value })
  }

  return (
    <S.Form onSubmit={onSubmit} noValidate autoComplete="off">
      {!!properties &&
        properties.map((property, index) => (
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
        <S.FormControl component="fieldset">
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
        </S.FormControl>
      )}
      {!!checkbox && (
        <S.Select
          labelId="groups-select-label"
          id={checkbox.property}
          multiple
          labelWidth={300}
          variant="standard"
          value={form[checkbox.property]}
          input={<Input />}
          renderValue={(selected: string[]) => 'Группы'}
          onChange={onChange(checkbox.property)}
        >
          {checkbox.values.map(value => (
            <MenuItem key={value.id} value={value.id}>
              <Checkbox checked={form[checkbox.property].indexOf(value.id) > -1} />
              <ListItemText primary={value.name} />
            </MenuItem>
          ))}
        </S.Select>
      )}
      <Button type="submit" nColor="success">
        Отправить
      </Button>
    </S.Form>
  )
}

export default CreationForm
