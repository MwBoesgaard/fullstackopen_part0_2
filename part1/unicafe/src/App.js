import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avgSum, setAvgSum] = useState(0);

  const goodClickHandler = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAvgSum(avgSum + 1);
  }
  
  const neutralClickHandler = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }

  const badClickHandler = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAvgSum(avgSum - 1);
  }
  if (all > 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button onClick={goodClickHandler} text="good"/>
        <Button onClick={neutralClickHandler} text="neutral"/>
        <Button onClick={badClickHandler} text="bad"/>
        <h1>statistics</h1>
        <Statistics goodCount={good} neutralCount={neutral} badCount={bad} allCount={all} avgSum={avgSum}/>
      </div>
    );
  } else {
    return (
      <div>
        <h1>give feedback</h1>
        <Button onClick={goodClickHandler} text="good"/>
        <Button onClick={neutralClickHandler} text="neutral"/>
        <Button onClick={badClickHandler} text="bad"/>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticsLine text='good' value={props.goodCount}/>
        <StatisticsLine text='neutral' value={props.neutralCount}/>
        <StatisticsLine text='bad' value={props.badCount}/>
        <StatisticsLine text='all' value={props.allCount}/>
        <StatisticsLine text='average' value={props.allCount === 0 ? 0 : props.avgSum/props.allCount}/>
        <StatisticsLine text='positive' value={(props.allCount === 0 ? 0 : props.goodCount/props.allCount*100) + ' %'}/>
      </tbody>
    </table>
  );
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );
};

export default App;
