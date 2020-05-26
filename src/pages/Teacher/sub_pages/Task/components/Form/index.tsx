import React, { FC, useEffect, useState, ChangeEventHandler, FormEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import cn from 'classnames'
import { observer } from 'mobx-react'

import sizes from 'lib/theme/sizes'
import CustomPaper from 'components/CustomPaper'

import S from './styles'

type TOuterProps = {
  className?: string
  task: Data.Task
  onFormSubmit: (task: Data.Task) => void
}
type TProps = TOuterProps
type TState = {
  name?: string
  description?: string
  exts?: string
}

const useStyles = makeStyles(() => ({
  paper: {
    padding: '1.25rem'
  },
  textField: {
    marginRight: sizes.MARGIN,
    marginLeft: sizes.MARGIN
  },
  submitButton: {
    marginLeft: 'auto'
  },
  cancelButton: {
    marginLeft: sizes.MARGIN
  },
  listItem: {
    '&:hover': {
      '& $changeButton': {
        opacity: 1
      }
    }
  },
  changeButton: {
    // opacity: 0,
    transition: 'opacity 0.3s'
  }
}))

const Form: FC<TProps> = ({ className, task, onFormSubmit }) => {
  const [form, setForm] = useState<TState>({})
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const classes = useStyles()

  useEffect(() => {
    setForm({
      name: task.name,
      exts: task.exts.join('; '),
      description: task.description
    })
  }, [task])

  const onSubmitClick: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    onFormSubmit({
      ...task,
      name: form.name,
      description: form.description,
      exts: form.exts
        .replace(/\s*/g, '')
        .split(';')
        .map(ext => (ext[0] === '.' ? ext : `.${ext}`))
    })
    setIsEditing(false)
  }

  const onChange = (property: keyof TState): ChangeEventHandler<HTMLInputElement> => e => {
    setForm({ ...form, [property]: e.target.value })
  }

  return (
    <CustomPaper className={cn(classes.paper, className)}>
      {isEditing ? (
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
            <Button
              className={classes.submitButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              Сохранить изменения
            </Button>
            <Button
              className={classes.cancelButton}
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(false)}
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
      ) : (
        <ListItem className={classes.listItem} button onClick={() => setIsEditing(true)}>
          <ListItemText>{task.name}</ListItemText>
          <Button className={classes.changeButton} variant="contained" color="primary">
            Изменить
          </Button>
        </ListItem>
      )}
    </CustomPaper>
  )
}

export default observer(Form)
