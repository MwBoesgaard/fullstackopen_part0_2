import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);

  const listOfVotes = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(listOfVotes);

  const [indexOfMax, setIndexOfMax] = useState(0);

  const nextHandler = () => {
    const randomNumber = Math.floor((Math.random() * anecdotes.length)); 
    setSelected(randomNumber);
  }

  const voteHandler = () => {
    const listCopy = [... votes];
    listCopy[selected] += 1;
    setVotes(listCopy);

    const maxVotes = Math.max(... listCopy);
    const indexOfMax = listCopy.indexOf(maxVotes);
    setIndexOfMax(indexOfMax);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <p><button onClick={nextHandler}>next anecdote</button></p>
      <p><button onClick={voteHandler}>vote</button></p>
      <h1>Anecdote with most votes</h1>
      {anecdotes[indexOfMax]}
      <p>has {votes[indexOfMax]} votes</p>
    </div>
  )
}

export default App