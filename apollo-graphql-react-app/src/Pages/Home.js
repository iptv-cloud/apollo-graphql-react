import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MOVIE_QUERY } from "../graphql/Queries";

function Home() {
  const [movieSearched, setMovieSearched] = useState("");
  const [getSearchMovie, { data, error }] = useLazyQuery(GET_MOVIE_QUERY, {
    variables: { name: movieSearched },
  });

  if (error) return <h1> Error found</h1>;

  if (data) {
    console.log(data);
  }

  return (
    <div className="home">
      <h1>Search For Movie</h1>
      <input
        type="text"
        placeholder="Movie name..."
        onChange={(event) => {
          setCitySearched(event.target.value);
        }}
      />
      <button onClick={() => getSearchMovie()}> Search</button>
      <div className="movid">
        {data && (
          <>
            <h1> {data.getSearchMovie.name} </h1>
            <h1>
              {"Movie Search "}
              Title: {data.getSearchMovie.movid.resultes.title}
            </h1>
            <h1>
              Description: {data.getSearchMovie.movid.resultes.overview}
            </h1>
            <h1>poster_path: {data.getSearchMovie.movid.resultes.poster_path}</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
