import React from 'react';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Header from './components/layout/header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Login></Login>
      <Register></Register>
    </div>
  );
}

export default App;
