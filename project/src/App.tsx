import React from 'react';
import { HashRouter as Router, useRoutes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Header } from '@components';

import 'font-awesome/css/font-awesome.css';
import './main.scss';

const Popular = React.lazy(() => import(/* webpackChunkName: 'Popular' */ './pages/Popular'));
const NotFound = React.lazy(() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'));
const Battle = React.lazy(() => import(/* webpackChunkName: 'Battle' */ './pages/Battle'));
const Result = React.lazy(() => import(/* webpackChunkName: 'Result' */ './pages/Result'));

const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <React.Suspense>
          <Popular />
        </React.Suspense>
      ),
    },
    {
      path: '/battle',
      element: (
        <React.Suspense>
          <Battle />
        </React.Suspense>
      ),
    },
    {
      path: '/result',
      element: (
        <React.Suspense>
          <Result />
        </React.Suspense>
      ),
    },
    {
      path: '*',
      element: (
        <React.Suspense>
          <NotFound />
        </React.Suspense>
      ),
    },
  ]);
  return routes;
};

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <GetRoutes />
    </Router>
  );
};

const element = document.getElementById('root');
if (element) {
  const root = createRoot(element);
  root.render(<App />);
}
