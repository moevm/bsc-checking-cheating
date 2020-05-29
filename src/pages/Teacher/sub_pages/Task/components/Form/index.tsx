import React, { FC, useState, ChangeEventHandler, FormEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import { observer } from 'mobx-react'

import sizes from 'lib/theme/sizes'
import CustomPaper from 'components/CustomPaper'

import S from './styles'
import { Input, FormControl } from '@material-ui/core'

type TOuterProps = {
  className?: string
  task: Data.Task
  onCancelCreating: () => void
  onFormSubmit: (task: Data.Task) => void
}
type TProps = TOuterProps
type TState = {
  name?: string
  groups: string[]
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
  },
  listItem: {
    '&:hover': {
      '& $changeButton': {
        opacity: 1
      }
    }
  },
  changeButton: {
    transition: 'opacity 0.3s'
  }
}))

const Form: FC<TProps> = ({ className, task, onCancelCreating, onFormSubmit }) => {
  const [form, setForm] = useState<TState>({
    name: task.name,
    groups: task.groups,
    exts: task.exts ? task.exts.join('; ') : '',
    description: task.description || ''
  })
  const [isEditing, setIsEditing] = useState<boolean>(!!task.isCreating)
  const classes = useStyles()

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

  const onResetClick = () => {
    if (task.isCreating) {
      setIsEditing(false)
      onCancelCreating()
    } else {
      setIsEditing(false)
    }
  }

  const onChange = (property: keyof TState): ChangeEventHandler<HTMLInputElement> => e => {
    setForm({ ...form, [property]: e.target.value })
  }

  return (
    <CustomPaper className={className}>
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
            <FormControl>
              <InputLabel id="groups-select-label">Номера групп</InputLabel>
              <Select
                labelId="groups-select-label"
                id="group-select"
                autoWidth
                multiple
                labelWidth={300}
                value={form.groups}
                input={<Input />}
                renderValue={(selected: string[]) => selected.join(', ')}
                onChange={onChange('groups')}
              >
                {task.subjectGroups.map(group => (
                  <MenuItem key={group} value={group}>
                    <Checkbox checked={form.groups.indexOf(group) > -1} />
                    <ListItemText primary={group} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              className={classes.submitButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              {task.isCreating ? 'Сохранить задание' : 'Сохранить изменения'}
            </Button>
            <Button
              className={classes.cancelButton}
              variant="contained"
              color="primary"
              onClick={onResetClick}
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
