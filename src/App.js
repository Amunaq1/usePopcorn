import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Main } from './Main';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

export const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Year: '2010',
    Title: 'Inception',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const KEY = '298078f3';
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(null);
  const [query, setQuery] = useState('');
  const [movieClicked, setMovieClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function getData() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok)
            throw new Error('Something went wrong while fetching data!');
          const data = await res.json();
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          console.error(err.message);
        }
      }
      getData();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar moviesLength={movies?.length} query={query} setQuery={setQuery} />
      <Main
        KEY={KEY}
        movies={movies}
        watched={watched}
        setWatched={setWatched}
        movieClicked={movieClicked}
        setMovieClicked={setMovieClicked}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
}
