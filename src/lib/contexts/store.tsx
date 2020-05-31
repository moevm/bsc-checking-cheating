import React, { createContext } from 'react'
import { useLocalStore } from 'mobx-react'

import createStore from 'lib/store'

export const storeContext = createContext<App.TStore>(null)

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore)

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}
