export const getTokensData = async () => {
  const getDexTokensPrices = `
  query getDexTokensPrices {
      getDexTokensPrices {
        symbol
        price
      }
    }
  `

  return fetch('https://api.aldrin.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'getDexTokensPrices',
      query: getDexTokensPrices,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      const map = new Map()

      if (data && data.data && data.data.getDexTokensPrices) {
        data.data.getDexTokensPrices.forEach((tokenData) => {
          map.set(tokenData.symbol, tokenData.price)
        })
      }

      return map
    })
}
