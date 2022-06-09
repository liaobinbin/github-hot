import React from 'react';
import { createRoot } from 'react-dom/client';

import './main.scss';

class App extends React.Component {
  render() {
    return <h1>323</h1>;
  }
}

const element = document.getElementById('root');
if (element) {
  const root = createRoot(element);
  root.render(<App />);
}
