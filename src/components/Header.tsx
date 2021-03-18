import React from 'react';

interface Genre {
  selectedGenre: any;
}

const Header = ({ selectedGenre }: Genre) => {
  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
};

export default Header;
