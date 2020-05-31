import React, { FC, useCallback, useEffect } from 'react'
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

  const onKeyPress: EventListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      student.closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onKeyPress)

    return () => document.removeEventListener('keyup', onKeyPress)
  })

  const dropzoneParams: DropzoneOptions = {
    accept: student.choosenTask.exts,
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
        <S.LoadedFileWrapper>
          <S.LoadedFile>{student.uploadedFile.name}</S.LoadedFile>
          <S.ButtonsWrapper>
            <S.SendButton onClick={onSendClick}>Отправить</S.SendButton>
            <S.CandelButton onClick={onRemoveClick}>Убрать</S.CandelButton>
          </S.ButtonsWrapper>
        </S.LoadedFileWrapper>
      ) : (
        <Dropzone description={student.choosenTask.description} params={dropzoneParams} />
      )}
    </Modal>
  )
}

export default observer(UploadModal)
