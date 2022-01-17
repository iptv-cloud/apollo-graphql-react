import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MOVIE_QUERY } from "../graphql/Queries";

function Home() {
  const [movieSearched, setMovieSearched] = useState("");
  const [getMovie, { data, error }] = useLazyQuery(GET_MOVIE_QUERY, {
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
      <button onClick={() => getMovie()}> Search</button>
      <div className="movid">
        {data && (
          <>
            <h1> {data.getMovidByName.name} </h1>
            <h1>
              {"Movie Search "}
              Title: {data.getMovidByName.movid.resultes.title}
            </h1>
            <h1>
              Description: {data.getMovidByName.movid.resultes.overview}
            </h1>
            <h1>poster_path: {data.getMovidByName.movid.resultes.poster_path}</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
