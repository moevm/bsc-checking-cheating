import styled from 'styled-components'

type TContainerProps = {
  isDragActive?: boolean
}

const Styled = {
  Container: styled.div<TContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25rem;
    height: 20.75rem;
    padding: 1.875rem;
    color: ${props => props.isDragActive && props.theme.colors.TINT[700]};
    text-align: center;
    background-color: ${props => props.isDragActive && props.theme.colors.PRIMARY};
    border: 2px solid ${props => props.theme.colors.TINT[100]};
    border-radius: 0.3125rem;
    transition-duration: 0.2s;
    transition-property: color background-color;
  `,
  Title: styled.p<TContainerProps>`
    margin-bottom: 2rem;
    font-size: 1.25rem;
    font-weight: 700;
  `,
  Info: styled.p`
    margin-bottom: ${props => props.theme.sizes.MARGIN};
    line-height: 1.5;
    text-align: left;
    &::first-line {
      text-indent: 1.25rem;
    }
  `
}

export default Styled
