import { Router } from 'router5'

import { Theme } from 'lib/theme'

declare namespace App {
  type TRouter = Router

  type TTheme = Theme
}

export = App
export as namespace App
