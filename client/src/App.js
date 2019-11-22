import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          kube ci integration
        </p>
        <a
          className="App-link"
          href="https://github.com/shinethroughtrees/kube-ci-redis-api-server"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Repository
        </a>
      </header>
    </div>
  );
}

export default App;
