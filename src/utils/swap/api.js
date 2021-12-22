/* eslint-disable no-undef */
import { useAsyncData } from '../fetch-loop'

export class SwapApiError extends Error {
  constructor(msg, status) {
    super(msg)
    this.name = 'SwapApiError'
    this.status = status
  }
}

export async function swapApiRequest(
  method,
  path,
  body,
  { ignoreUserErrors = false } = {},
) {
  const headers = {}
  const params = { headers, method }
  if (method === 'GET') {
    params.cache = 'no-cache'
  } else if (body) {
    headers['Content-Type'] = 'application/json'
    params.body = JSON.stringify(body)
  }
  const resp = await fetch(`https://swap.sollet.io/api/${path}`, params)
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return handleSwapApiResponse(resp, ignoreUserErrors)
}

async function handleSwapApiResponse(resp, ignoreUserErrors) {
  const json = await resp.json()
  if (!json.success) {
    if (ignoreUserErrors && resp.status >= 400 && resp.status < 500) {
      return null
    }
    throw new SwapApiError(json.error, resp.status)
  }
  return json.result
}

export function useSwapApiGet(path, options) {
  return useAsyncData(
    async () => {
      if (!path) {
        return null
      }
      return swapApiRequest('GET', path, undefined, {
        ignoreUserErrors: true,
      })
    },
    ['swapApiGet', path],
    options,
  )
}
