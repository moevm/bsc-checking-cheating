import styled from 'styled-components'

export default {
  Input: styled.input`
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 300;
    color: ${props => props.theme.colors.TEXT};
    text-overflow: ellipsis;
    background-color: ${props => props.theme.colors.MAIN};
    border: 1px solid ${props => (props.disabled ? 'transparent' : props.theme.colors.TINT[20])};
    transition: ${props => props.theme.styles.transition.border};
    &:focus {
      border-color: ${props => props.theme.colors.PRIMARY};
    }
    &::placeholder {
      color: ${props => props.theme.colors.TINT[500]};
    }
  `
}
