import React, { ComponentType } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import useStore from 'hooks/useStore'

export type TWithStoreProps = { store: App.TStore }
type TWithStoreHOC = <TOuterProps = {}, TProps = TWithStoreProps>(
  WrappedComponent: ComponentType<TProps>
) => (props: TOuterProps) => JSX.Element

export const withStore: TWithStoreHOC = WrappedComponent => {
  const displayName = WrappedComponent.displayName
  const WithStore = props => {
    const store = useStore()

    return <WrappedComponent {...props} store={store} />
  }

  WithStore.defaultProps = { ...WrappedComponent.defaultProps }
  WithStore.displayName = `WithServices(${displayName})`

  return hoistNonReactStatics(WithStore, WrappedComponent)
}
