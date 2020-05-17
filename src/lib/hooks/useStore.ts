import { useContext } from 'react'

import { storeContext } from 'lib/contexts/store'

const useStore = () => {
  const store = useContext(storeContext)

  if (!store) {
    throw new Error('no StoreProvider')
  }

  return {
    ...store
  }
}

export default useStore
