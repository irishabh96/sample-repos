import React, { Suspense } from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

export const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Route component={Login} exact path="/" />
        <Route component={Home} exact path="/home" />
      </Suspense>
    </Router>
  );
};
