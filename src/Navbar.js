import { useEffect, useState } from 'react';

export function Navbar({ moviesLength, query, setQuery }) {
  useEffect(() => {
    console.log(query);
  }, [query]);
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{moviesLength ? moviesLength : '0'}</strong> results
      </p>
    </nav>
  );
}
