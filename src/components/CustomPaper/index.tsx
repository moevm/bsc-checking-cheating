import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import cn from 'classnames'

type TOuterProps = {
  className?: string
}
type TProps = TOuterProps

const useStyles = makeStyles(() => ({
  paper: {
    padding: '1rem'
  }
}))

const CustomPaper: FC<TProps> = ({ className, children }) => {
  const classes = useStyles()

  return (
    <Paper className={cn(classes.paper, className)} elevation={4}>
      {children}
    </Paper>
  )
}

export default CustomPaper
