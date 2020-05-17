import React, { FC } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'

import { Container, Title, Info } from './styles'

type TOuterProps = {
  className?: string
  params: DropzoneOptions
}
type TProps = TOuterProps

const Dropzone: FC<TProps> = ({ className, params }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(params)

  return (
    <Container className={className} {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      <Title>Загрузите файл</Title>
      <Info>Выберите файл на копьютере или перенесите его в это окно</Info>
    </Container>
  )
}

export default Dropzone
