import { ComponentType } from 'react'

export default function compose<TInner, TOutter>(
  ...func: Function[]
): (component: ComponentType<TOutter>) => ComponentType<TOutter> {
  return func.reduce(
    (a, b) => (...args) => a(b(...args)),
    arg => arg
  ) as (component: ComponentType<TOutter>) => ComponentType<TOutter>
}
