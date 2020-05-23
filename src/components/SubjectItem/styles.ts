import styled from 'styled-components'

export default {
  Item: styled.li`
    margin-bottom: 0.625rem;
    list-style: none;
    /* border: 1px solid ${props => props.theme.colors.TINT[20]}; */
  `,
  Container: styled.div`
    display: flex;
    list-style: none;
  `,
  TasksList: styled.ul`
    padding-left: ${props => props.theme.sizes.LIST_PADDING};
  `
}
