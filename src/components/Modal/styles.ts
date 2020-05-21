import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.TRANSLUCENT_BLACK};
`

export const Container = styled.div`
  position: absolute;
  padding: 1.25rem 1.5625rem;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${props => props.theme.styles.borderRadius};
`
