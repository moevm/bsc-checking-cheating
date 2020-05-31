import { Router, SubscribeState } from 'router5'

import { Store } from 'lib/store'
import { Theme } from 'lib/theme'

declare namespace App {
  type TRouter = Router
  type TStore = Store
  type TTheme = Theme
  type TInjectedRouteProps = Partial<SubscribeState>
}

export = App
export as namespace App
