import React, { FC, useCallback } from 'react'
import { observer } from 'mobx-react'

import DiffViewer from 'components/DiffViewer'
import Modal from 'components/Modal'

type TOuterProps = {
  difference: Data.Difference
  onCloseClick: () => void
}
type TProps = TOuterProps

const DiffModal: FC<TProps> = ({ difference, onCloseClick }) => (
  <Modal onCloseClick={onCloseClick}>
    <DiffViewer original={difference.reference} plagiat={difference.current} />
  </Modal>
)

export default observer(DiffModal)
