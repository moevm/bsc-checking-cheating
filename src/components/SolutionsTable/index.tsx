import React, { FC } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

type TOuterProps = {
  solutions: Data.Solution[]
}
type TProps = TOuterProps

const SolutionsTable: FC<TProps> = ({ solutions }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ф.И.О</TableCell>
            <TableCell>Группа</TableCell>
            <TableCell>Результат</TableCell>
            <TableCell>Файл работы</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {solutions.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.group_number}</TableCell>
              <TableCell>{item.originality}</TableCell>
              <TableCell>File</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SolutionsTable
