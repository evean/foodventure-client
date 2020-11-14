import React from 'react';
import { DishOfTheDay } from './dish-of-the-day';

import style from './hero.module.scss';

export const Hero = () => {
  return (
    <div className={style.hero}>
      <div className={style.heroContent}>
        {/*<DishOfTheDay />*/}
      </div>
    </div>
  );
};