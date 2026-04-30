import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;

  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  if (total !== 0) {
    return (
      <div>
        <h1>stats</h1>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {total}</p>
        <p>average: {average}</p>
        <p>positive: {positive}%</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>stats</h1>
        <p>no feedback given</p>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
