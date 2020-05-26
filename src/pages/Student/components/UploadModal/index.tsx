import React, { FC, useCallback, MouseEventHandler } from 'react'
import { observer } from 'mobx-react'
import { DropzoneOptions } from 'react-dropzone'

import useStore from 'hooks/useStore'
import Dropzone from 'components/Dropzone'
import Modal from 'components/Modal'

import S from './styles'

type TOuterProps = {
  className?: string
}
type TProps = TOuterProps

const UploadModal: FC<TProps> = ({ className }) => {
  const { student } = useStore()

  const dropzoneParams: DropzoneOptions = {
    accept: ['.cpp', '.js', 'image/jpeg'],
    maxSize: 10 * 1024 * 1024 * 8,
    onDrop: useCallback(
      acceptedFiles => {
        student.addFile(acceptedFiles[0])
      },
      [document]
    ),
    onDropRejected: rejected => console.log(rejected)
  }

  const onRemoveClick = useCallback(() => {
    student.removeFile()
  }, [])

  const onSendClick = useCallback(() => {
    student.sendSolution()
  }, [])

  const onCloseClick = useCallback(() => {
    student.closeModal()
    student.removeFile()
  }, [])

  return (
    <Modal onCloseClick={onCloseClick}>
      {student.uploadedFile ? (
        <div>
          <p>{student.uploadedFile.name}</p>
          <button onClick={onRemoveClick}>Убрать</button>
          <button onClick={onSendClick}>Отправить</button>
        </div>
      ) : (
        <Dropzone params={dropzoneParams} />
      )}
    </Modal>
  )
}

export default observer(UploadModal)
