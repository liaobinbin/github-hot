import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Popular</Link>
        <Link to="/battle">Battle</Link>
      </nav>
    </header>
  );
};
