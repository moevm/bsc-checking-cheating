import styled from 'styled-components'

type TContainerProps = {
  isDragActive?: boolean
}

export const Title = styled.p<TContainerProps>`
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
`
export const Container = styled.div<TContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25rem;
  height: 18.75rem;
  padding: 1.875rem;
  text-align: center;
  border: ${props => props.theme.colors.TINT[100]};
  border-radius: 0.3125rem;
`

export const Info = styled.p``
