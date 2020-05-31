import React, { FC } from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

type TOuterProps = {
  original: Data.DiffObject
  plagiat: Data.DiffObject
}
type TProps = TOuterProps

const DiffViewer: FC<TProps> = ({ original, plagiat }) => (
  <ReactDiffViewer
    oldValue={original.file}
    newValue={plagiat.file}
    disableWordDiff
    compareMethod={DiffMethod.WORDS}
    leftTitle={original.title}
    rightTitle={plagiat.title}
    styles={{
      variables: {
        light: {
          diffViewerBackground: '#ffeef0',
          addedBackground: '#fff',
          removedBackground: '#fff',
          addedGutterBackground: '#f7f7f7',
          removedGutterBackground: '#f7f7f7',
          gutterBackground: '#f7f7f7'
        }
      },
      titleBlock: {
        textAlign: 'center'
      }
    }}
  />
)

export default DiffViewer
