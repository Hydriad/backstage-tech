import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { getSquareOfSum, getSumOfSquares } from './mathyUtils';

interface CalculationResponse {
  /** current datetime of request */
  datetime: Date;
  /** datetime of previous request */
  last_datetime: Date;
  /** solution */
  value: number;
  /** input number */
  number: number;
  /** number of times input number has been requested */
  occurrences: number;
}

const calculateSquareSumDiff = async (n: number):Promise<CalculationResponse> => {
  const diff = getSquareOfSum(n) - getSumOfSquares(n);

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
  const [input, setInput] = useState<string | number>("");
  const [result, setResult] =  useState<number | undefined>(undefined);

  const inputIsValid = typeof input !== "string" && input > 0 && input <= 100;

  const handleInputChange = (val: string) => {
    // allow user to empty input
    if (val === "") {
      return setInput("");
    }

    const num = parseInt(val, 10);
    setInput(num);
    setResult(undefined);
  }

  const calculateDiff = async (num: number) => {
    const response = await calculateSquareSumDiff(num);
    setResult(response.value);
  };

  return (
    <div className="app">
      <div className="box">
        <h1>
          Square Sum Diff
        </h1>

        <div className="inputs">
          <input type="number" value={input} onChange={(e) => handleInputChange(e.target.value)} max={100} min={1} />
          <button disabled={!inputIsValid} onClick={() => inputIsValid && calculateDiff(input)}>
            CALCULATE
          </button>
        </div>

        {!inputIsValid && input !== "" &&
          <p className="error-text">Please enter a value between 1 and 100.</p>
        }

        <section className="result">
          {result !== undefined &&
            <>
              <h1>Result</h1>
              <h3>{result.toLocaleString()}</h3>
            </>
          }
        </section>
      </div>
    </div>
  );
}

export default App;
