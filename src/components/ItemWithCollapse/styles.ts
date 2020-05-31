import styled from 'styled-components'

export default {
  Container: styled.div`
    display: flex;
    list-style: none;
  `,
  ChildrenList: styled.ul`
    padding-left: ${props => props.theme.sizes.LIST_PADDING};
  `
}
