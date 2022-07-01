import React from 'react';

import style from './style.module.scss';

export const Loading: React.FC = () => {
  return (
    <div className={style['loader-container']}>
      <div className={style.loader} />
    </div>
  );
};
