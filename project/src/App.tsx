import React from 'react';
import { HashRouter as Router, useRoutes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Popular } from './pages';

import './main.scss';

const GetRoutes = () => {
  const routes = useRoutes([{ path: '/', element: <Popular /> }]);
  return routes;
};

const App: React.FC = () => {
  return (
    <Router>
      <GetRoutes />
    </Router>
  );
};

const element = document.getElementById('root');
if (element) {
  const root = createRoot(element);
  root.render(<App />);
}
