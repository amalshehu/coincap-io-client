import React from 'react';
import './App.css';
import './components/header/Header';
import Header from './components/header/Header';
import Table from './components/table/Table';
import { Box } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header />
      <Table></Table>
    </div>
  );
};

export default App;
