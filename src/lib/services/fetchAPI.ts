import axios from 'axios'

import { API_URL, METHOD } from 'constants/api'

type TFetchOptions = {
  body?: any
  endpoint: string
  method?: METHOD
  params?: { [key: string]: any }
  path?: string
}

export default function <T>({
  body,
  endpoint,
  method = METHOD.GET,
  params,
  path = ''
}: TFetchOptions) {
  const url = `${API_URL}${endpoint}${path}`

  console.log(method.toUpperCase(), url)

  return axios.request<T>({
    url,
    method,
    params,
    data: body
  })
}
