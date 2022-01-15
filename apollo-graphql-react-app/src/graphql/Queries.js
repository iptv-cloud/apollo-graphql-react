import { gql } from "@apollo/client";

export const GET_MOVIE_QUERY = gql`
  query getMovieByName($name: String!) {
    getMovieByName(name: $name) {
      name
      country
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`;
