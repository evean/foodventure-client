import React from 'react';
import { Card } from './card';

import style from './recipe-cards.module.scss';

export const RecipeCards = ({
  data,
  limit
}) => {
  const renderCards = data => {
    console.log('rendering', data)
    return data.map(card =>
      <Card
        key={card.name}
        data={card}
      />
    )
  }

  return (
    <div className={style.recipeCards}>
      {renderCards(data)}
    </div>
  );
};