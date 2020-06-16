import React, { FC, useState, useCallback } from 'react'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { observer } from 'mobx-react'

import CustomPaper from 'components/CustomPaper'

import S from './styles'

type TAddButton = {
  name: string
  onClick: () => void
}
type TTableColumn = {
  name: string
  property: string
}
type TOuterProps = {
  className?: string
  // button: TAddButton
  columns: TTableColumn[]
  content: any[]
  title: string
  onAddClick?: () => void
  onRowClick?: (content: any) => () => void
}
type TProps = TOuterProps

const ContentTable: FC<TProps> = ({
  className,
  columns,
  content,
  title,
  onAddClick,
  onRowClick
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  return (
    <CustomPaper className={className}>
      <ListItem button onClick={() => setIsOpened(!isOpened)}>
        <S.ListItemText disableTypography>{title}</S.ListItemText>
        {isOpened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpened}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <S.TableCell key={index}>{column.name}</S.TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((item, index) => (
                <TableRow
                  key={index}
                  hover={!!onRowClick}
                  onClick={onRowClick ? onRowClick(item) : null}
                >
                  {columns.map((column, index) => (
                    <TableCell key={index}>{item[column.property]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!!onAddClick && (
          <S.Button nColor="primary" onClick={onAddClick}>
            Добавить
          </S.Button>
        )}
      </Collapse>
    </CustomPaper>
  )
}

export default observer(ContentTable)
