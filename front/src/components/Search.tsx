import React from 'react';
import { Paste } from '../types/details.types';

const Search = ({ pastes, setFilteredPastes }: { pastes: Paste[]; setFilteredPastes: any }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredPastes = pastes.filter(paste => {
      return paste.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredPastes(filteredPastes);
  };

  return (
    <div>
      <input type="text" placeholder="🔎" onChange={e => changeHandler(e)} />
    </div>
  );
};

export default Search;
