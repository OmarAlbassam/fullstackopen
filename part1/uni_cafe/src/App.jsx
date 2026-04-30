import { useState } from "react";


const StatisticLine = ({ text, value, textAfter }) => {
  return(
    <p>{text}: {value}{textAfter}</p>
  )
}

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;

  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  if (total === 0) {
    return (
      <div>
        <h1>stats</h1>
        <p>no feedback given</p>
      </div>
    );
  } 
    return(
      <div>
        <h1>stats</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} textAfter={'%'} />
      </div>
    );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return(
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
