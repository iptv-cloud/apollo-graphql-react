/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RestLink } from 'apollo-link-rest'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { RetryLink } from 'apollo-link-retry'

import {
  getApiEndPoint,
  getToken,
  clearLocalStorage
} from './../utils/functions'
const restLink = new RestLink({
  uri: getApiEndPoint()
})

const authRestLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    let authHeaders = { ...headers, Accept: 'application/json', 'Access-Control-Allow-Origin': '*' }
    const token = getToken()
    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`
    }
    return {
      headers: {
        ...authHeaders
      }
    }
  })
  return forward(operation).map((result) => {
    const { restResponses } = operation.getContext()
    if (restResponses) {
      if (restResponses[0]?.status === 404) {
        console.log('404 Not found', restResponses)
      } else if (
        restResponses[0].status === 401 ||
        restResponses[0].status === '401'
      ) {
        clearLocalStorage().then(() => {
          window.location.href = window.location.origin + '/login'
        })
      }
      const authTokenResponse = restResponses.find((res) =>
        res.headers.has('Authorization')
      )
      if (authTokenResponse) {
        localStorage.setItem(
          'token',
          authTokenResponse.headers.get('Authorization')
        )
      }
    }

    return result
  })
})

const linkError = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    if (networkError.statusCode === 401) {
      clearLocalStorage().then(() => {
        window.location.href = window.location.origin + '/login'
      })
    }
  }
  if (graphQLErrors) {
    console.log('Erro gQL')
    for (let err of graphQLErrors) {
      // eslint-disable-next-line no-console
      console.log(err?.extensions?.code, err, 'GraphqlError')
    }
  }
})

const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    if (count < 3) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },

  delay: (count) => {
    return count * 1000 * Math.random()
  }
})

const link = ApolloLink.from([linkError, authRestLink, retryLink, restLink])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export default client
