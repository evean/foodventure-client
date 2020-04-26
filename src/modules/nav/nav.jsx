import React from 'react';
import { Link } from 'react-router-dom';

import style from './nav.module.scss';

export const Nav = () => {
  return (
    <div className={style.nav}>
      <div className={style.logo}>
        <Link to="/">LOGO</Link>
      </div>

      <div className={style.navItems}>
        <Link to="/mealplanner">Meal Planner</Link>
        <Link to="/pick-a-dish">Pick a Dish</Link>
        <Link to="blog">Blog</Link>
      </div>

      <div className={style.user}>
        User
      </div>
    </div>
  );
};