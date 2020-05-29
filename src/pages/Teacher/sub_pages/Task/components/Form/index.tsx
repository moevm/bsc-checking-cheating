import React, { FC, useState, ChangeEventHandler, FormEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import { observer } from 'mobx-react'

import sizes from 'lib/theme/sizes'
import CustomPaper from 'components/CustomPaper'

import S from './styles'

type TOuterProps = {
  className?: string
  task: Data.Task
  onCancelCreating: () => void
  onFormSubmit: (task: Data.Task) => void
}
type TProps = TOuterProps
type TState = Data.Task & {
  extsString: string
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
    ...task,
    extsString: task.exts ? task.exts.join('; ') : '',
    description: task.description || ''
  })
  const [isEditing, setIsEditing] = useState<boolean>(!!task.isCreating)
  const classes = useStyles()

  const onSubmitClick: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    onFormSubmit({
      ...form,
      bound: typeof form.bound === 'string' ? parseInt(form.bound) : form.bound,
      exts: form.extsString
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
              id="extsString"
              className={classes.textField}
              label="Допустимые расширения"
              size="small"
              variant="outlined"
              value={form.extsString}
              onChange={onChange('extsString')}
            />
            <FormControl>
              <InputLabel id="groups-select-label">Номера групп</InputLabel>
              <Select
                labelId="groups-select-label"
                id="group-select"
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
            <TextField
              id="bound"
              label="Граница (в %)"
              size="small"
              variant="outlined"
              value={form.bound}
              onChange={onChange('bound')}
            />

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

          <S.WrapperWithMargin>
            <S.FormControl component="fieldset">
              <S.FormLabel component="legend">Способ сравнения</S.FormLabel>
              <RadioGroup
                aria-label="check solution type"
                name="check_type"
                value={form.check_type}
                onChange={onChange('check_type')}
              >
                <S.FormControlLabel value="task" control={<Radio />} label="по заданию" />
                <S.FormControlLabel value="subject" control={<Radio />} label="по предмету" />
                <S.FormControlLabel value="all" control={<Radio />} label="по всей базе" />
              </RadioGroup>
            </S.FormControl>

            <TextField
              id="description"
              label="Описание задания"
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={form.description}
              onChange={onChange('description')}
            />
          </S.WrapperWithMargin>
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
