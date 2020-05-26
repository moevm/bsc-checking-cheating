import React, { FC } from 'react'
import ReactDiffViewer from 'react-diff-viewer'

type TOuterProps = {
  original: string
  plagiat: string
}
type TProps = TOuterProps

const DiffViewer: FC<TProps> = ({ original, plagiat }) => (
  <ReactDiffViewer oldValue={original} newValue={plagiat} />
)

export default DiffViewer
