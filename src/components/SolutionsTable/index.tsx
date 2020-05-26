import React, { FC, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { observer } from 'mobx-react'

import formatDate from 'utils/formatDate'
import CustomPaper from 'components/CustomPaper'

type TOuterProps = {
  solutions: Data.Solution[]
  onRowClick: (solution: Data.Solution) => () => void
}
type TProps = TOuterProps

const SolutionsTable: FC<TProps> = ({ solutions, onRowClick }) => (
  <CustomPaper>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ф.И.О</TableCell>
            <TableCell>Группа</TableCell>
            <TableCell>Оригинальность работы</TableCell>
            <TableCell>Дата сдачи</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {solutions.map((item, index) => (
            <TableRow key={index} hover onClick={onRowClick(item)}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.group_number}</TableCell>
              <TableCell>{item.originality} %</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </CustomPaper>
)

export default observer(SolutionsTable)
