import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getSqareOfSum, getSumOfSquares } from './mathyUtils';

interface CalculationResponse {
  /** current datetime of request */
  datetime: Date;
  /** datetime of previos request */
  last_datetime: Date;
  /** solution */
  value: number;
  /** input number */
  number: number;
  /** number of times input number has been requested */
  occurrences: number;
}

const calculateSquareSumDiff = async (n: number):Promise<CalculationResponse> => {
  const diff = getSumOfSquares(n) - getSqareOfSum(n);

  return new Promise<CalculationResponse>((resolve) => {
    resolve({
      datetime: new Date(),
      last_datetime: new Date(),
      value: diff,
      number: n,
      occurrences: 0
    });
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
