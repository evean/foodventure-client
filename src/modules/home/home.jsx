import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Hero } from './hero';
import { RecipeCards } from '../../components/recipe-cards/recipe-cards';
import { ALL_RECIPES } from './queries/home-queries';

import style from './home.module.scss';

export const Home = () => {
  const { data: recipes } = useQuery(ALL_RECIPES);

  return (
    <>
      <Hero />
      
      {/*
      <div className={style.homeContent}>
        {recipes &&
          <>
            <RecipeCards 
              limit={4}
              data={recipes.allRecipes.nodes}
              title="Favourites"
            />

            <RecipeCards 
              limit={4}
              data={recipes.allRecipes.nodes}
              title="Recently viewed"
            />
          </>
        }
      </div>
      */}
    </>
  );
};