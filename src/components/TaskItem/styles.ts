import styled from 'styled-components'

export default {
  Item: styled.li`
    display: flex;
    list-style: none;
    &:not(:last-child) {
      margin-bottom: ${props => props.theme.sizes.MARGIN};
    }
  `
}
