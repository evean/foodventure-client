import React from 'react';

import style from './recipe-cards.module.scss';

export const Card = ({
  data
}) => {
  return (
    <div className={style.card}>
      <img src={data.imageUrl} />
      <span className={style.cardTitle}>{data.name}</span>
      <span className={style.cardDescription}>{data.description}</span>

      <div className={style.cardDetailsRow}>
        <span>{data.difficulty}</span>
        <span>{data.time}</span>
      </div>
    </div>
  );
};