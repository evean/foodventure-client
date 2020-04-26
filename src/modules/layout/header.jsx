import React from 'react';
import { Nav } from '../nav/nav';

import style from './layout.module.scss';

export const Header = () => {
  return (
    <div className={style.header}>
      <Nav />
    </div>
  );
};