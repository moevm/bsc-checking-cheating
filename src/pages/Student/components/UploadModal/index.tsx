import React, { FC, useCallback, useState, MouseEventHandler } from 'react'

import Dropzone from 'components/Dropzone'
import Modal from 'components/Modal'

type TOuterProps = {
  className?: string
  onClose: MouseEventHandler<HTMLButtonElement>
}
type TProps = TOuterProps

const UploadModal: FC<TProps> = ({ className, onClose }) => {
  const [files, setFiles] = useState<File[]>()
  const dropzoneParams = {
    accept: ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'],
    maxSize: 10 * 1024 * 1024 * 8,
    onDrop: useCallback(
      acceptedFiles => {
        setFiles(acceptedFiles)
      },
      [document]
    )
  }

  return (
    <Modal>
      <Dropzone params={dropzoneParams} />
      <button onClick={onClose}>Закрыть</button>
    </Modal>
  )
}

export default UploadModal
