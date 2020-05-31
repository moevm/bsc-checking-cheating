import React, { FC } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'

import S from './styles'

type TOuterProps = {
  className?: string
  params: DropzoneOptions
}
type TProps = TOuterProps

const Dropzone: FC<TProps> = ({ className, params }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(params)

  return (
    <S.Container className={className} {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      <S.Title>Загрузите файл</S.Title>
      <S.Info>Выберите файл на копьютере или перенесите его в это окно</S.Info>
    </S.Container>
  )
}

export default Dropzone
