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

interface SquaredSumDB {
  [key: number]: CalculationResponse
}
const mockDB:SquaredSumDB = {};


const calculateSquareSumDiff = async (n: number):Promise<CalculationResponse> => {
  const diff = getSquareOfSum(n) - getSumOfSquares(n);
  const response = {
    datetime: new Date(),
    last_datetime: mockDB[n] ? mockDB[n].datetime : new Date(),
    value: diff,
    number: n,
    occurrences: mockDB[n] ? mockDB[n].occurrences + 1 : 1
  };

  mockDB[n] = response;

  return new Promise<CalculationResponse>((resolve) => {
    resolve(response);
  });
}

interface KeyValuePairProps {
  title: string;
  value: string | number;
}
const KeyValuePair = (props:KeyValuePairProps) => (
  <div className="keyValuePair">
    <p className="key">{props.title + ":"}</p>
    <p className="value">{props.value}</p>
  </div>
);

const Card = (props:CalculationResponse) => (
  <div className="box card">
    <KeyValuePair title="Datetime" value={props.datetime.toLocaleString()} />
    <KeyValuePair title="Last datetime" value={props.last_datetime.toLocaleString()} />
    <KeyValuePair title="Number entered" value={props.number} />
    <KeyValuePair title="Solution value" value={props.value} />
    <KeyValuePair title="Occurrences" value={props.occurrences} />
  </div>
);


function App() {
  const [input, setInput] = useState<string | number>("");
  const [result, setResult] =  useState<number | undefined>(undefined);
  const [apiResponses, setApiResponses] = useState<CalculationResponse[]>([]);

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
    setApiResponses([response, ...apiResponses]);
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
            <h1>Result: {result.toLocaleString()}</h1>
          }
        </section>
      </div>

      <ul className="cards-list">
      {apiResponses.map((response:CalculationResponse, i) => {
        return (
          <li key={`card-${i}`}>
            <Card 
              datetime={response.datetime}
              last_datetime={response.last_datetime}
              number={response.number}
              value={response.value}
              occurrences={response.occurrences}
            />
          </li>
        )
      })}
      </ul>
    </div>
  );
}

export default App;
