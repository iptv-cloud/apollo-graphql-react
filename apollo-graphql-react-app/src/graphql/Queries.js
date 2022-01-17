import { gql } from "@apollo/client";

export const GET_MOVIE_QUERY = gql`
  query getMovieByName($name: String!) {
    getMovieByName(name: $name) {
      page
      results {
        adult
        backdrop_path
        genre_ids
          {
          id
          }
        id
        original_language
        original_title
        overview
        poster_path
        release_date
        title
        video
        vote_average
        vote_count
        }
      total_pages
      total_results
    }
  }
`;
