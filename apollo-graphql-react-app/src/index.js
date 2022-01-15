import React from "react";
import ReactDom from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const TMDB_API_KEY = "01397a8a48c5389d13ae91dc2ed71feb";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const ALL_MOVIES = gql`
  query ExampleQuery {
    movies {
      title
      tagline
      released
      actors {
        name
      }
    }
  }
`;

const App = () => {
  return (
    <ApolloProvider client={client}>
      <nav className="navbar navbar-dark bg-danger">
        <div className="container-fluid">
          <h1>
            <a className="navbar-brand" href="#DB">
              Movie DB
            </a>
          </h1>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <Movies />
        </div>
      </div>
    </ApolloProvider>
  );
};

async function getMovieData(title) {
  const tmdbQueryString = title.replace(" ", "+");
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${tmdbQueryString}`
  );
  return response.json();
}

class MovieImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, poster: "" };
  }
  async componentDidMount() {
    const data = await getMovieData(this.props.title);
    this.setState({ poster: data.results[0].poster_path, loaded: true });
  }
  render() {
    if (!this.state.loaded) {
      return (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
      >
        <img
          className="img-fluid img-thumbnail"
          src={"https://image.tmdb.org/t/p/w500/" + this.state.poster}
          alt={this.props.title}
        ></img>
      </div>
    );
  }
}

const Movie = (props) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <MovieImage title={props.movie.title} />
      <div className="container-fluid">
        <h3>
          {props.movie.title} ({props.movie.released})
        </h3>
        <p>{props.movie.tagline}</p>
        {props.movie.actors.slice(0, 3).map((actor) => (
          <p key={actor.name}>{actor.name}</p>
        ))}
        <p></p>
      </div>
    </div>
  );
};

const Movies = () => {
  const { loading, error, data } = useQuery(ALL_MOVIES);
  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  return data.movies.map((movie) => <Movie movie={movie} key={movie.title} />);
};

ReactDom.render(<App />, document.getElementById("root"));