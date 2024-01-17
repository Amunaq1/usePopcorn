import { useState } from 'react';

const average = (arr) =>
  arr?.reduce((acc, cur, i, arr) => {
    return acc + cur / arr.length;
  }, 0);
export function RightBox({ watched, setWatched, rating, selectedMovie }) {
  const [isOpen2, setIsOpen2] = useState(true);
  const avgRuntime = watched
    ? average(watched?.map((movie) => movie.runtime?.split(' ')[0]))?.toFixed(0)
    : 0;
  const avgImdbRating = watched
    ? average(watched?.map((movie) => movie.imdbRating))?.toFixed(1)
    : 0;
  const avgUserRating = watched
    ? average(watched?.map((movie) => movie.userRating))?.toFixed(1)
    : 0;
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched?.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>

          <ul className="list">
            {watched?.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime}</span>
                  </p>
                  <button
                    className="btn-delete"
                    onClick={() =>
                      setWatched(
                        watched.filter(
                          (wMovie) => wMovie.imdbID !== movie.imdbID
                        )
                      )
                    }
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
