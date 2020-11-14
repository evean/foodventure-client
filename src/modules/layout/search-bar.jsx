import React from 'react';

import SearchIcon from '@material-ui/icons/Search';

import style from './layout.module.scss';

export const SearchBar = ({
  
}) => {
  return (
    <div className={style.searchBar}>
      <button className={style.searchBtn}>
        <SearchIcon />
      </button>
      <input
        disabled
        placeholder="Coming soon..."
        type="text"
      />
    </div>
  );
};