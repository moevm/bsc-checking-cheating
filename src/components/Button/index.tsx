import React, { FC } from 'react'
import styled from 'styled-components'

import fetchAPI from 'services/fetchAPI'
import { ENDPOINT } from 'constants/api'

type TOuterProps = {
  title: string
}
type TProps = TOuterProps

const Button: FC<TProps> = ({ title }) => {
  const onButtonClick = async () => {
    const data = await fetchAPI({ endpoint: ENDPOINT.STUDENT_INFO })

    console.log('RESULT', data)
  }

  return <button onClick={onButtonClick}>send student request</button>
}

export default Button
