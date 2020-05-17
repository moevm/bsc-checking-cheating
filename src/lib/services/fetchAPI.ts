import axios from 'axios'

import { API_URL, METHOD } from 'constants/api'

type TFetchOptions = {
  method?: METHOD
  endpoint: string
}

export default function <T>({ method = METHOD.GET, endpoint }: TFetchOptions) {
  const url = `${API_URL}${endpoint}`

  console.log(method.toUpperCase(), url)

  return axios.request<T>({
    url,
    method
  })
}
