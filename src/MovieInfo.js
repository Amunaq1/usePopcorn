import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';

export default function MovieInfo({
  KEY,
  poster,
  rating,
  setRating,
  setMovieClicked,
  watched,
  setWatched,
  selectedMovie,
  setSelectedMovie,
  movieClicked,
}) {
  useEffect(
    function () {
      console.log(selectedMovie?.Title);
      if (!selectedMovie?.Title) return;
      document.title = `Movie | ${selectedMovie?.Title}`;
      return function () {
        document.title = 'usePopcorn';
      };
    },
    [selectedMovie]
  );
  function handleAddButton() {
    console.log(selectedMovie);
    if (watched) {
      setWatched([
        ...watched,
        {
          imdbID: selectedMovie.imdbID,
          Poster: poster,
          Title: selectedMovie.Title,
          imdbRating: selectedMovie.imdbRating,
          userRating: rating,
          runtime: selectedMovie.Runtime,
        },
      ]);
    } else {
      setWatched([
        {
          imdbID: selectedMovie.imdbID,
          Poster: poster,
          Title: selectedMovie.Title,
          imdbRating: selectedMovie.imdbRating,
          userRating: rating,
          runtime: selectedMovie.Runtime,
        },
      ]);
    }
    setMovieClicked(false);
  }
  return (
    <div className="box">
      <div className="details">
        <header>
          <button className="btn-back" onClick={() => setMovieClicked(false)}>
            <strong>&larr;</strong>
          </button>
          <img src={poster} alt="poster"></img>
          <div className="details-overview">
            <h2>{selectedMovie?.Title}</h2>
            <p>{`${selectedMovie?.Released} ▫ ${selectedMovie?.Runtime}`}</p>
            <p>{selectedMovie?.Genre}</p>
            <p>{`⭐️ ${selectedMovie?.imdbRating} IMDb rating`}</p>
          </div>
        </header>
        <section>
          <div className="rating">
            {!watched?.some((movie) =>
              movie?.imdbID.includes(selectedMovie.imdbID)
            ) ? (
              <>
                <StarRating
                  maximumRating={10}
                  rating={rating}
                  setRating={setRating}
                  movieClicked={movieClicked}
                />
                <button className="btn-add" onClick={handleAddButton}>
                  Add To List
                </button>
              </>
            ) : (
              <p>
                This movie is already added to your Watch List and you've rated
                it ⭐️<strong>{selectedMovie.imdbRating}</strong>
              </p>
            )}
          </div>
        </section>
        <footer>
          <p>{selectedMovie?.Plot}</p>
          <p>{`Starring: ${selectedMovie?.Actors}`}</p>
          <p>{`Director: ${selectedMovie?.Director}`}</p>
        </footer>
      </div>
    </div>
  );
}
