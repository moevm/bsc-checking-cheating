import styled from 'styled-components'

export default {
  Item: styled.li`
    list-style: none;
  `,
  Container: styled.div`
    display: flex;
    list-style: none;
  `,
  TasksList: styled.ul`
    padding-left: ${props => props.theme.sizes.LIST_PADDING};
  `
}
