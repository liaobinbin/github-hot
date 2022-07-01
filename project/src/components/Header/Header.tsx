import React from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <nav>
        <Link to="/">Popular</Link>
        <Link to="/battle">Battle</Link>
      </nav>
    </header>
  );
};
