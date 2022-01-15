import gql from 'graphql-tag'

export const AuthMutation = gql`
  mutation Auth($input: authData!) {
    auth(input: $authData)
      @rest(type: "auth", path: "/create-session", method: "POST") {
      data
      result
    }
  }
`
