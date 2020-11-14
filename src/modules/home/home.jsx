import React from 'react';
import { Link } from 'react-router-dom';
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

      <div className={style.comingSoon}>
        <h2>Coming soon!</h2>
        <p>In the meantime, if you've got a recipe you'd like to share please submit it <Link to="recipe-form">here</Link>.</p>
        <img className={style.welcomeImage} src="welcome.png" />
      </div>
      
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