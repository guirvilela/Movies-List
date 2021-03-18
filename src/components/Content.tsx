import React, { useEffect, useState } from 'react';
import { GenreResponseProps } from '../App';
import Header from './Header';
import { MovieCard } from './MovieCard';
import { api } from '../services/api';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface ProperyMovies {
  selectedGenreId: number;
}

const Content = ({ selectedGenreId }: ProperyMovies) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps,
  );

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header selectedGenre={selectedGenre}></Header>
      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Content;
