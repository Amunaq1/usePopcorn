import { useEffect, useState } from 'react';
import { tempWatchedData } from './App';
import { LeftBox } from './LeftBox';
import { RightBox } from './RightBox';
import MovieInfo from './MovieInfo';

export function Main({
  KEY,
  movies,
  watched,
  setWatched,
  movieClicked,
  setMovieClicked,
  isLoading,
}) {
  const [rating, setRating] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${movieClicked?.imdbID}`
        );
        const data = await res.json();
        setSelectedMovie(data);
      }
      getMovieDetails();
    },
    [movieClicked?.imdbID]
  );

  return (
    <main className="main">
      <LeftBox
        movies={movies}
        setMovieClicked={setMovieClicked}
        isLoading={isLoading}
      />
      {!movieClicked ? (
        <RightBox
          watched={watched}
          setWatched={setWatched}
          rating={rating}
          selectedMovie={selectedMovie}
        />
      ) : (
        <MovieInfo
          KEY={KEY}
          poster={movieClicked.Poster}
          rating={rating}
          setRating={setRating}
          setMovieClicked={setMovieClicked}
          watched={watched}
          setWatched={setWatched}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          movieClicked={movieClicked}
        />
      )}
    </main>
  );
}
