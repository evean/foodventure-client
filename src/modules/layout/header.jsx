import React from 'react';
import { Navigation } from '../nav/nav';

import style from './layout.module.scss';

export const Header = () => {
  return (
    <div className={style.header}>
      <Navigation />
    </div>
  );
};