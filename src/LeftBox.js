import { useState } from 'react';

export function LeftBox({ movies, setMovieClicked, isLoading }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      {console.log(isLoading)}
      {isLoading ? (
        <div className="loader">🕙 Loading...</div>
      ) : (
        <>
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? '–' : '+'}
          </button>
          {isOpen1 && (
            <ul className="list">
              {movies?.map((movie) => (
                <li
                  key={movie.imdbID}
                  className="list-movies"
                  onClick={() => setMovieClicked(movie)}
                >
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
