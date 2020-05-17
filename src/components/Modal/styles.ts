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
  padding: 0.9375rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.WHITE};
`
