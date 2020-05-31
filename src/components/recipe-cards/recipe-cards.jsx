import React from 'react';
import { Card } from './card';

import style from './recipe-cards.module.scss';

export const RecipeCards = ({
  data,
  limit,
  title
}) => {
  const renderCards = data => {
    const dataWithLimit = data.slice(0, limit);
    return dataWithLimit.map(card =>
      <Card
        key={card.name}
        data={card}
      />
    )
  }

  return (
    <div className={style.recipeCards}>
      <h2>{title}</h2>
      {renderCards(data)}
    </div>
  );
};