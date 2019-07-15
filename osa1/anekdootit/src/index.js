import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Votes = ({points}) => {
  return (
    <div>has {points} votes</div>
  )
}

const Winner = ({anecdotes, points}) => {
  const max = Math.max(...points)
  const place = points.indexOf(max)
  return (
    <div>
      {anecdotes[place]}
      <p>Has {max} votes</p>
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const handleVoting = () => {
      const copy = [...points]
      copy[selected] += 1
      return (setPoints(copy))
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <Votes
        points={points[selected]}
      />
      <Button
        text={'vote'}
        handleClick={handleVoting}
      />
      <Button 
        text={'next anecdote'}
        handleClick={ () => setSelected( Math.floor(Math.random() *6)) } 
      />
      <h2>Anecdote with most votes</h2>
      <Winner
        anecdotes={anecdotes}
        points={points}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
) 