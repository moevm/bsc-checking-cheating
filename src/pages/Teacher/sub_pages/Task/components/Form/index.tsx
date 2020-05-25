import React, { FC, useEffect, useState, ChangeEventHandler, FormEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { observer } from 'mobx-react'

import sizes from 'lib/theme/sizes'

import S from './styles'

type TOuterProps = {
  task: Data.Task
  onCancelClick: () => void
  onFormSubmit: (task: Data.Task) => void
}
type TProps = TOuterProps
type TState = {
  name?: string
  description?: string
  exts?: string
}

const useStyles = makeStyles(() => ({
  textField: {
    marginRight: sizes.MARGIN,
    marginLeft: sizes.MARGIN
  },
  submitButton: {
    marginLeft: 'auto'
  },
  cancelButton: {
    marginLeft: sizes.MARGIN
  }
}))

const Form: FC<TProps> = ({ task, onCancelClick, onFormSubmit }) => {
  const [form, setForm] = useState<TState>({
    name: task.name,
    exts: task.exts.join('; '),
    description: task.description
  })
  const classes = useStyles()

  const onSubmitClick: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    // onFormSubmit()
  }

  const onChange = (property: keyof TState): ChangeEventHandler<HTMLInputElement> => e => {
    setForm({ ...form, [property]: e.target.value })
  }

  return (
    <form onSubmit={onSubmitClick} noValidate autoComplete="off">
      <S.Wrapper>
        <TextField
          id="name"
          label="Название задания"
          size="small"
          variant="outlined"
          value={form.name}
          onChange={onChange('name')}
        />
        <TextField
          id="exts"
          className={classes.textField}
          label="Допустимые расширения"
          size="small"
          variant="outlined"
          value={form.exts}
          onChange={onChange('exts')}
        />
        <Button className={classes.submitButton} type="submit" variant="contained" color="primary">
          Сохранить изменения
        </Button>
        <Button
          className={classes.cancelButton}
          variant="contained"
          color="primary"
          onClick={onCancelClick}
        >
          Отмена
        </Button>
      </S.Wrapper>

      <TextField
        id="description"
        label="Описание задания"
        fullWidth
        margin="normal"
        multiline
        rows={6}
        variant="outlined"
        value={form.description}
        onChange={onChange('description')}
      />
    </form>
  )
}

export default observer(Form)
