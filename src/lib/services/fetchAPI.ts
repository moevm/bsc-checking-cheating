import axios from 'axios'

import { API_URL, METHOD } from 'constants/api'

type TFetchOptions = {
  method?: METHOD
  endpoint: string
}

export default function ({ method = METHOD.GET, endpoint }: TFetchOptions) {
  const url = `${API_URL}${endpoint}`

  return axios.request({
    url,
    method
  })
}
