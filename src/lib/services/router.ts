import { createRouter, Router } from 'router5'

import { TCustomRoute } from 'constants/routes'

class RouterService {
  private router: Router

  constructor(routes: TCustomRoute[]) {
    this.router = createRouter(routes)
  }

  get instance(): Router {
    return this.router
  }
}

export default RouterService
