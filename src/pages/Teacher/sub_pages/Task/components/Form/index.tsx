import React, { FC, useState, ChangeEventHandler, FormEventHandler } from 'react'
import Alert from '@material-ui/lab/Alert'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Select from '@material-ui/core/Select'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { observer } from 'mobx-react'

import CustomPaper from 'components/CustomPaper'

import S from './styles'

type TOuterProps = {
  className?: string
  task: Data.Task
  onCancelCreating: () => void
  onDeleteClick: () => void
  onFormSubmit: (task: Data.Task) => void
}
type TProps = TOuterProps
type TState = Data.Task & {
  extsString: string
}

const useStyle = makeStyles(() => ({
  arrow: {
    color: 'rgba(0, 0, 0, 0.9)'
  },
  tooltip: {
    padding: 10,
    fontWeight: 700,
    fontSize: '0.75rem',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  }
}))

const Form: FC<TProps> = ({ className, task, onCancelCreating, onDeleteClick, onFormSubmit }) => {
  const classes = useStyle()
  const [form, setForm] = useState<TState>({
    ...task,
    extsString: task.exts ? task.exts.join('; ') : '',
    description: task.description || ''
  })
  const [isEditing, setIsEditing] = useState<boolean>(!!task.isCreating)

  const onSubmitClick: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    onFormSubmit({
      ...form,
      bound: typeof form.bound === 'string' ? parseInt(form.bound) : form.bound,
      exts: form.extsString
        ? form.extsString
            .toLowerCase()
            .replace(/\s*/g, '')
            .split(';')
            .map(ext => (ext[0] === '.' ? ext : `.${ext}`))
        : []
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
            <S.LeftColumn>
              <S.NameTextField
                id="name"
                label="Название задания"
                fullWidth
                size="small"
                variant="outlined"
                value={form.name}
                onChange={onChange('name')}
              />

              <S.SecondRow>
                <Tooltip
                  classes={classes}
                  title="Необходимо перечислить допустимые раширения файлов через точку с запятой (; )"
                  placement="top-start"
                  arrow
                >
                  <TextField
                    id="extsString"
                    disabled
                    label="Допустимые расширения"
                    size="small"
                    variant="outlined"
                    value={form.extsString}
                    onChange={onChange('extsString')}
                  />
                </Tooltip>
                <S.BoundTextField
                  // error
                  id="bound"
                  // helperText="Можно использовать только цифры"
                  label="Граница (в %)"
                  size="small"
                  variant="outlined"
                  value={form.bound}
                  onChange={onChange('bound')}
                />
                <S.GroupFormControl>
                  <InputLabel id="groups-select-label">Номера групп</InputLabel>
                  <Select
                    labelId="groups-select-label"
                    id="group-select"
                    multiple
                    labelWidth={300}
                    variant="standard"
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
                </S.GroupFormControl>
              </S.SecondRow>
            </S.LeftColumn>

            <S.RightColumn>
              <S.SaveButton type="submit" variant="contained">
                {task.isCreating ? 'Создать' : 'Сохранить'}
              </S.SaveButton>
              <S.CancelButton variant="contained" onClick={onResetClick}>
                Отменить
              </S.CancelButton>
              {!task.isCreating && (
                <S.DeleteButton variant="contained" onClick={onDeleteClick}>
                  Удалить
                </S.DeleteButton>
              )}
            </S.RightColumn>
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
        <S.ListItem button onClick={() => setIsEditing(true)}>
          {/* <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={true}>
            <Alert elevation={6} variant="filled" severity="success">
              Изменения сохранены
            </Alert>
          </Snackbar> */}

          <ListItemText>{task.name}</ListItemText>
          <S.FakeButton variant="contained" color="primary">
            Изменить
          </S.FakeButton>
        </S.ListItem>
      )}
    </CustomPaper>
  )
}

export default observer(Form)
