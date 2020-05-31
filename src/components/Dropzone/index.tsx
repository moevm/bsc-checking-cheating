import React, { FC } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'

import S from './styles'

type TOuterProps = {
  className?: string
  description?: string
  params: DropzoneOptions
}
type TProps = TOuterProps

const Dropzone: FC<TProps> = ({ className, description, params }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(params)

  return (
    <S.Container className={className} {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      <S.Title>Загрузите файл</S.Title>
      <S.Info>{description || 'Выберите файл на копьютере или перенесите его в это окно'}</S.Info>
      <p>(допустимые расширения: {(params.accept as string[]).join(', ')})</p>
    </S.Container>
  )
}

export default Dropzone
