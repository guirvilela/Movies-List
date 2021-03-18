import { Button } from '../components/Button';
import { GenreResponseProps } from '../App';
import { useEffect, useState } from 'react';

import { api } from '../services/api';

export function SideBar(props: any) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setselectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  function returnIdSelected(selectedSelectId: any) {
    setselectedGenreId(selectedSelectId);
    props.returnIdSelected(selectedSelectId);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => returnIdSelected(genre.id)}
            selected={selectedGenreId == genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
