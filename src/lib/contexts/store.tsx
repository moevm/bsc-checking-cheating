import React, { createContext, FC } from 'react'
import { useLocalStore } from 'mobx-react'
import { Router } from 'router5'

import createStore from 'lib/store'

export type TStoreProviderProps = {
  router: Router
}

export const storeContext = createContext<App.TStore>(null)

export const StoreProvider: FC<TStoreProviderProps> = ({ children, router }) => {
  const store = useLocalStore(() => createStore(router))

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}
