import React, { FC } from 'react';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Header from './components/layout/header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: FC = () => {
  return (
    <Router>
      <Header/>

      <Switch>
        <Route path="/login"><Login/></Route>
        <Route path="/register"><Register/></Route>
      </Switch>

    </Router>
  );
}

export default App;
