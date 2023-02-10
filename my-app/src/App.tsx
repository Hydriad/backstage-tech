import React, { useState } from 'react';
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
  const diff = getSqareOfSum(n) - getSumOfSquares(n);

  console.log("diff", diff);

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
  const [ input, setInput ] = useState<string | number>("");
  const inputIsValid = typeof input !== "string" && input <= 100;

  const handleInputChange = (val: string) => {
    const num = parseInt(val, 10);

    // if (isNaN(num)) return;
    setInput(num);
  }

  return (
    <div className="app">
      <h1>
        Square Sum Diff
      </h1>

      <input type="number" value={input} onChange={(e) => handleInputChange(e.target.value)} max={100} />
      <button disabled={!inputIsValid} onClick={() => inputIsValid && calculateSquareSumDiff(input)}>
        Calculate
      </button>
    </div>
  );
}

export default App;
