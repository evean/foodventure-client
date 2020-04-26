import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_RECIPES } from './queries/home-queries';
import { RecipeCards } from '../../components/recipe-cards/recipe-cards';

import style from './hero.module.scss';

export const DishOfTheDay = () => {
  const { data: recipes } = useQuery(ALL_RECIPES);

  return (
    <div className={style.heroText}>
      <h3 className={style.heroSubTitle}>
        West meets East
      </h3>

      <h2 className={style.heroTitle}>
        Dishes of the Day
      </h2>

      <p>End the day with two of our favorite dishes. Lorem ipsum...</p>

      <div className={style.heroItems}>
        {recipes &&
          <RecipeCards 
            limit={2}
            data={recipes.allRecipes.nodes}
          />
        }
      </div>
    </div>
  );
};


