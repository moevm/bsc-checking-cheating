import React, { FC, useEffect, useState, ChangeEventHandler } from 'react'
import TextField from '@material-ui/core/TextField'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'

type TOuterProps = {
  task: Data.Task
}
type TProps = TOuterProps
type TState = {
  name?: string
  description?: string
  exts?: string
}

const Form: FC<TProps> = ({ task }) => {
  const [form, setForm] = useState<TState>({
    name: task.name
  })

  const onSubmitClick = () => {}

  const onChange = (property: keyof TState): ChangeEventHandler<HTMLInputElement> => e => {
    setForm({ ...form, [property]: e.target.value })
  }

  return (
    <form onSubmit={onSubmitClick} noValidate autoComplete="off">
      <TextField
        id="name"
        label="Название"
        size="small"
        variant="outlined"
        value={form.name}
        onChange={onChange('name')}
      />
    </form>
  )
}

export default observer(Form)
