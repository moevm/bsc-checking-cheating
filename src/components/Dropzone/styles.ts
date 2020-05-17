import styled from 'styled-components'

type TContainerProps = {
  isDragActive?: boolean
}

export const Title = styled.p<TContainerProps>``
export const Container = styled.div<TContainerProps>`
  background-color: ${props => props.isDragActive && props.theme.colors.TRANSLUCENT_BLACK};

  & ${Title} {
    color: white;
  }
`

export const Info = styled.p``
