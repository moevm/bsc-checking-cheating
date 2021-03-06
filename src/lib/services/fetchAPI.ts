import axios from 'axios'

import { API_URL, METHOD } from 'constants/api'

type TFetchOptions = {
  body?: any
  endpoint: string
  method?: METHOD
  params?: { [key: string]: any }
  path?: string
  token?: string
}

export default function <T>({
  body,
  endpoint,
  method = METHOD.GET,
  params,
  path = '',
  token = ''
}: TFetchOptions) {
  const url = `${API_URL}${endpoint}${path}`
  const reqHeaders = token ? { Authorization: `Bearer ${token}` } : {}

  console.log(method.toUpperCase(), url)

  return axios.request<T>({
    url,
    headers: reqHeaders,
    method,
    params,
    data: body
  })
}
